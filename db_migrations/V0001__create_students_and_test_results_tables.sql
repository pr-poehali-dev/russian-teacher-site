-- Создание таблицы учеников
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы тестов
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы результатов тестов
CREATE TABLE test_results (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    test_id INTEGER REFERENCES tests(id),
    answers JSONB NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для улучшения производительности
CREATE INDEX idx_test_results_student_id ON test_results(student_id);
CREATE INDEX idx_test_results_test_id ON test_results(test_id);
CREATE INDEX idx_test_results_completed_at ON test_results(completed_at);

-- Вставка начальных тестов
INSERT INTO tests (title, description, questions_data) VALUES 
(
    'Падежи русского языка',
    'Проверьте знание падежей и их окончаний',
    '[
        {
            "question": "В каком падеже стоит слово ''дому'' в предложении ''Я иду к дому''?",
            "options": ["Именительный", "Родительный", "Дательный", "Винительный"],
            "correct": 2
        },
        {
            "question": "Какое окончание у слова ''стол'' в творительном падеже?",
            "options": ["-ом", "-ам", "-е", "-ы"],
            "correct": 0
        }
    ]'::jsonb
),
(
    'Орфография',
    'Тест на правописание сложных слов',
    '[
        {
            "question": "Как правильно написать слово?",
            "options": ["Преподаватель", "Приподаватель", "Преподователь", "Приподователь"],
            "correct": 0
        }
    ]'::jsonb
);

-- Вставка тестовых учеников
INSERT INTO students (name, email) VALUES 
('Анна Петрова', 'anna.petrova@email.com'),
('Иван Сидоров', 'ivan.sidorov@email.com'),
('Мария Козлова', 'maria.kozlova@email.com'),
('Алексей Волков', 'alexey.volkov@email.com');

-- Вставка тестовых результатов
INSERT INTO test_results (student_id, test_id, answers, score) VALUES 
(1, 1, '["2", "0"]'::jsonb, 100),
(1, 2, '["0"]'::jsonb, 100),
(2, 1, '["1", "0"]'::jsonb, 50),
(2, 2, '["0"]'::jsonb, 100),
(3, 1, '["2", "0"]'::jsonb, 100),
(3, 2, '["0"]'::jsonb, 100),
(4, 1, '["1", "1"]'::jsonb, 0),
(4, 2, '["1"]'::jsonb, 0);