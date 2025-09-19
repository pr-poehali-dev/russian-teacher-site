import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

function Index() {
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: string }>({});
  const [testResults, setTestResults] = useState<{ [key: number]: number }>({});

  const tests = [
    {
      id: 1,
      title: "Падежи русского языка",
      description: "Проверьте знание падежей и их окончаний",
      questions: [
        {
          question: "В каком падеже стоит слово 'дому' в предложении 'Я иду к дому'?",
          options: ["Именительный", "Родительный", "Дательный", "Винительный"],
          correct: 2
        },
        {
          question: "Какое окончание у слова 'стол' в творительном падеже?",
          options: ["-ом", "-ам", "-е", "-ы"],
          correct: 0
        }
      ]
    },
    {
      id: 2,
      title: "Орфография",
      description: "Тест на правописание сложных слов",
      questions: [
        {
          question: "Как правильно написать слово?",
          options: ["Преподаватель", "Приподаватель", "Преподователь", "Приподователь"],
          correct: 0
        }
      ]
    }
  ];

  const progressData = [
    { student: "Анна Петрова", tests: 8, average: 92 },
    { student: "Иван Сидоров", tests: 6, average: 78 },
    { student: "Мария Козлова", tests: 10, average: 95 },
    { student: "Алексей Волков", tests: 4, average: 65 }
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (currentTest !== null) {
      setTestAnswers(prev => ({
        ...prev,
        [questionIndex]: answerIndex.toString()
      }));
    }
  };

  const submitTest = () => {
    if (currentTest !== null) {
      const test = tests[currentTest];
      let correct = 0;
      test.questions.forEach((q, index) => {
        if (testAnswers[index] === q.correct.toString()) {
          correct++;
        }
      });
      const score = Math.round((correct / test.questions.length) * 100);
      setTestResults(prev => ({ ...prev, [currentTest]: score }));
      setCurrentTest(null);
      setTestAnswers({});
    }
  };

  return (
    <div className="min-h-screen bg-warm-light">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-warm-beige/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-montserrat font-bold text-warm-brown">
                Русский язык с Еленой
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-dark hover:text-warm-brown transition-colors">Обо мне</a>
              <a href="#tests" className="text-slate-dark hover:text-warm-brown transition-colors">Тесты</a>
              <a href="#lessons" className="text-slate-dark hover:text-warm-brown transition-colors">Уроки</a>
              <a href="#materials" className="text-slate-dark hover:text-warm-brown transition-colors">Материалы</a>
              <a href="#contacts" className="text-slate-dark hover:text-warm-brown transition-colors">Контакты</a>
            </div>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-slate-dark leading-tight">
                Изучайте русский язык с удовольствием
              </h2>
              <p className="text-lg text-slate-dark/80 leading-relaxed">
                Индивидуальный подход, интерактивные тесты и система отслеживания прогресса 
                помогут вам достичь отличных результатов в изучении русского языка.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-warm-brown hover:bg-warm-brown/90 text-white px-8 py-3 rounded-xl">
                  Начать изучение
                </Button>
                <Button variant="outline" className="border-warm-brown text-warm-brown hover:bg-warm-brown/10 px-8 py-3 rounded-xl">
                  Пройти тест
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/028c086a-aa3b-4c84-8bfe-97874e62c78f.jpg" 
                alt="Учитель русского языка"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-sky-blue text-slate-dark p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={20} className="text-warm-brown" />
                  <span className="font-montserrat font-semibold">15+ лет опыта</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="about" className="rounded-lg">Обо мне</TabsTrigger>
            <TabsTrigger value="tests" className="rounded-lg">Тесты</TabsTrigger>
            <TabsTrigger value="lessons" className="rounded-lg">Уроки</TabsTrigger>
            <TabsTrigger value="materials" className="rounded-lg">Материалы</TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-lg">Контакты</TabsTrigger>
          </TabsList>

          {/* About Section */}
          <TabsContent value="about" className="space-y-6">
            <Card className="border-warm-beige/50 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat text-slate-dark">
                  <Icon name="User" size={24} className="inline mr-2" />
                  О преподавателе
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-dark/80 leading-relaxed">
                  Меня зовут Елена, и я преподаю русский язык уже более 15 лет. За это время я помогла 
                  сотням учеников улучшить свои знания и полюбить наш прекрасный язык.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-sky-light rounded-xl">
                    <Icon name="Users" size={32} className="mx-auto mb-2 text-warm-brown" />
                    <h4 className="font-montserrat font-semibold">500+ учеников</h4>
                  </div>
                  <div className="text-center p-4 bg-warm-beige/30 rounded-xl">
                    <Icon name="Award" size={32} className="mx-auto mb-2 text-warm-brown" />
                    <h4 className="font-montserrat font-semibold">15+ лет опыта</h4>
                  </div>
                  <div className="text-center p-4 bg-sky-light rounded-xl">
                    <Icon name="BookOpen" size={32} className="mx-auto mb-2 text-warm-brown" />
                    <h4 className="font-montserrat font-semibold">Авторские методики</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Section */}
          <TabsContent value="tests" className="space-y-6">
            {currentTest === null ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-montserrat font-bold text-slate-dark mb-4">
                    Интерактивные тесты
                  </h3>
                  <p className="text-slate-dark/80">Проверьте свои знания русского языка</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {tests.map((test) => (
                    <Card key={test.id} className="border-warm-beige/50 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="font-montserrat">{test.title}</span>
                          {testResults[tests.indexOf(test)] && (
                            <Badge className="bg-sky-blue text-slate-dark">
                              {testResults[tests.indexOf(test)]}%
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-dark/60">
                            {test.questions.length} вопросов
                          </span>
                          <Button 
                            onClick={() => setCurrentTest(tests.indexOf(test))}
                            className="bg-warm-brown hover:bg-warm-brown/90 text-white rounded-xl"
                          >
                            Начать тест
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-montserrat">{tests[currentTest].title}</CardTitle>
                  <Progress value={(Object.keys(testAnswers).length / tests[currentTest].questions.length) * 100} />
                </CardHeader>
                <CardContent className="space-y-6">
                  {tests[currentTest].questions.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-4">
                      <h4 className="font-montserrat font-semibold text-slate-dark">
                        {qIndex + 1}. {question.question}
                      </h4>
                      <div className="grid gap-2">
                        {question.options.map((option, oIndex) => (
                          <Button
                            key={oIndex}
                            variant={testAnswers[qIndex] === oIndex.toString() ? "default" : "outline"}
                            className="justify-start text-left h-auto p-4 rounded-xl"
                            onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentTest(null)}
                      className="rounded-xl"
                    >
                      Отменить
                    </Button>
                    <Button 
                      onClick={submitTest}
                      disabled={Object.keys(testAnswers).length !== tests[currentTest].questions.length}
                      className="bg-warm-brown hover:bg-warm-brown/90 text-white rounded-xl"
                    >
                      Завершить тест
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Progress Dashboard */}
          <TabsContent value="lessons" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-montserrat font-bold text-slate-dark mb-4">
                Прогресс учеников
              </h3>
              <p className="text-slate-dark/80">Отслеживание успеваемости и результатов</p>
            </div>
            <div className="grid gap-4">
              {progressData.map((student, index) => (
                <Card key={index} className="border-warm-beige/50 shadow-lg rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-montserrat font-semibold text-slate-dark">{student.student}</h4>
                        <p className="text-sm text-slate-dark/60">Пройдено тестов: {student.tests}</p>
                      </div>
                      <Badge className={`${student.average >= 90 ? 'bg-green-100 text-green-800' : 
                                       student.average >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-red-100 text-red-800'}`}>
                        {student.average}%
                      </Badge>
                    </div>
                    <Progress value={student.average} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Materials Section */}
          <TabsContent value="materials" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-montserrat font-bold text-slate-dark mb-4">
                Учебные материалы
              </h3>
              <p className="text-slate-dark/80">Полезные ресурсы для изучения русского языка</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Icon name="FileText" size={32} className="text-warm-brown mb-2" />
                  <CardTitle className="font-montserrat">Правила орфографии</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-dark/80 mb-4">Справочник по правилам русской орфографии</p>
                  <Button variant="outline" className="w-full rounded-xl">Скачать PDF</Button>
                </CardContent>
              </Card>
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Icon name="Video" size={32} className="text-warm-brown mb-2" />
                  <CardTitle className="font-montserrat">Видеоуроки</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-dark/80 mb-4">Обучающие видео по грамматике</p>
                  <Button variant="outline" className="w-full rounded-xl">Смотреть</Button>
                </CardContent>
              </Card>
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Icon name="Headphones" size={32} className="text-warm-brown mb-2" />
                  <CardTitle className="font-montserrat">Аудиоматериалы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-dark/80 mb-4">Упражнения на произношение</p>
                  <Button variant="outline" className="w-full rounded-xl">Слушать</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Section */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-montserrat font-bold text-slate-dark mb-4">
                Связаться со мной
              </h3>
              <p className="text-slate-dark/80">Готова ответить на ваши вопросы</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-montserrat">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-warm-brown" />
                    <span>elena.russian@email.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={20} className="text-warm-brown" />
                    <span>+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={20} className="text-warm-brown" />
                    <span>Москва, метро Сокольники</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} className="text-warm-brown" />
                    <span>Пн-Пт: 9:00-18:00</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-warm-beige/50 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-montserrat">Записаться на урок</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-warm-brown hover:bg-warm-brown/90 text-white py-3 rounded-xl">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Выбрать время урока
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Index;