import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление результатами тестов - получение и сохранение
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name, etc.
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS OPTIONS запроса
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Получение строки подключения к БД
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    try:
        with psycopg2.connect(database_url) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                
                if method == 'GET':
                    # Получение статистики прогресса учеников
                    cur.execute("""
                        SELECT 
                            s.name as student,
                            COUNT(tr.id) as tests,
                            COALESCE(ROUND(AVG(tr.score)), 0) as average
                        FROM students s
                        LEFT JOIN test_results tr ON s.id = tr.student_id
                        GROUP BY s.id, s.name
                        ORDER BY average DESC
                    """)
                    
                    progress_data = [dict(row) for row in cur.fetchall()]
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'progress': progress_data
                        })
                    }
                
                elif method == 'POST':
                    # Сохранение результата теста
                    body_data = json.loads(event.get('body', '{}'))
                    
                    student_name = body_data.get('studentName')
                    test_id = body_data.get('testId')
                    answers = body_data.get('answers')
                    score = body_data.get('score')
                    
                    if not all([student_name, test_id is not None, answers is not None, score is not None]):
                        return {
                            'statusCode': 400,
                            'headers': {'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Missing required fields'})
                        }
                    
                    # Найти или создать ученика
                    cur.execute(
                        "SELECT id FROM students WHERE name = %s",
                        (student_name,)
                    )
                    student_row = cur.fetchone()
                    
                    if student_row:
                        student_id = student_row['id']
                    else:
                        # Создать нового ученика
                        cur.execute(
                            "INSERT INTO students (name) VALUES (%s) RETURNING id",
                            (student_name,)
                        )
                        student_id = cur.fetchone()['id']
                    
                    # Сохранить результат теста
                    cur.execute("""
                        INSERT INTO test_results (student_id, test_id, answers, score)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id
                    """, (student_id, test_id, json.dumps(answers), score))
                    
                    result_id = cur.fetchone()['id']
                    
                    return {
                        'statusCode': 201,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': True,
                            'resultId': result_id,
                            'message': 'Результат теста сохранен'
                        })
                    }
                
                else:
                    return {
                        'statusCode': 405,
                        'headers': {'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Method not allowed'})
                    }
    
    except psycopg2.Error as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Database error',
                'details': str(e)
            })
        }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Internal server error',
                'details': str(e)
            })
        }