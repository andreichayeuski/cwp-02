# Работа с сокетами в Node.js ЛР02
function task00() {

Создаем на Github репозиторий cwp-02, клонируем его, открываем в IDE

В корне проекта создадим файлы server.js, client.js и qa.json

Напишем самые простые клиент и сервер с использованием tcp-сокетов:

// server.js

const net = require('net');

const port = 8124;

const server = net.createServer((client) => {

console.log('Client connected');

client.setEncoding('utf8');

  client.on('data', (data) => {

console.log(data);

client.write('\r\nHello!\r\nRegards,\r\nServer\r\n');

});

client.on('end', () => console.log('Client disconnected'));

});

server.listen(port, () => {

console.log(`Server listening on localhost:${port}`);

});



// client.js

const net = require('net');

const port = 8124;

const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {

console.log('Connected');

client.write('\r\nHello, Server!\r\nLove,\r\nClient.\r\n');

});



client.on('data', function(data) {

console.log(data);

client.destroy();

});


client.on('close', function() {

console.log('Connection closed');

});

}

function task01() {

Разобравшись с устройством базового клиент-серверного приложения, нам необходимо расширить его функционал

1. Каждому подключенному клиенту сервер должен присваивать уникальный идентификатор. Можно использовать Date.now() + seed++

2. Для начала взаимодействия клиент отправляет строку QA

3. Cервер подтверждает правильность полученной команды строкой ACK или отказывает строкой DEC c отключением клиента

4. В файле qa.json напишем пары вопросов-ответов. В начале работы клиент считывает все пары и перемешивает их в случайном порядке.

5. После подтверждения от сервера клиент начинает посылать вопросы серверу. Клиент сравнивает полученный ответ от сервера со своим и печатает вопрос, ответ и правильность ответа. Вопросы посылаются последовательно, т.е. второй вопрос будет отправлен только после получение ответа на первый.

6. Сервер на каждый вопрос случайным образом решает правильный ответ посылать или нет.

7. Для каждого из клиентов сервер ведет отдельный лог переписки в файле client_id.log

8. Напишем скрипт client-swarm.js, который с помощью модуля child_process или worker_threads запускает N клиентов. Число клиентов передается в скрипт через аргументы командной строки

}


function task02() {

Синхронизируем локальный репозиторий с удаленным (сделаем push на Github)

}
