# Веб-приложение "Шахматы"

Приложение написано на JavaScript библиотеке React с использованием языка TypeScript и стейт-менеджера MobX.

Также приложение использует такие прикладные инструменты, как: React Router, React Context, модульные CSS стили.

Посмотреть результат можно по [ссылке](https://ts-chess-game.vercel.app/).

Разработанные шахматы имеют классические правила и возможность включения опционального таймера с комфортным временем для игры для обоих игроков. По умолчанию игра не имеет ограничения по времени.

Игра поддерживает следующие приёмы и варианты развития событий:

- Мат (Ситуация, когда король находится под шахом, и игрок не может сделать ни одного хода, чтобы его избежать)
- Пат (Положение в игре, когда один из игроков не может сделать хода, не подставив под удар своего короля)
- Проигрыш по истечению времени (Игрок, первый израсходовавший всё своё время, признаётся проигравшим независимо от положения в партии)
- Рокировка (Одновременный ход королём и ладьёй, при котором ладья придвигается к королю, а король ставится рядом по другую её сторону)
- Взятие на проходе (Специальный ход пешки, при котором она берёт пешку противника, перемещённую с начальной позиции сразу на два поля)

Шахматы исключают возможность самостоятельно подставить короля под шах передвижением союзной фигуры или самого короля.

Также, в случае шаха, для передвижения будут доступны только те фигуры, которые могут предотвратить опасность для своего короля.

Побежденные фигуры каждого игрока отображаются под игровым полем.

В случае завершения игры, игроки будут уведомлены о статусе игры всплывающим окном, появляющимся в правом верхнем углу экрана.

Базовый код игры написан по [обучающему ролику](https://www.youtube.com/watch?v=mUvYGUYMvKo) YouTube канала Ulbi TV.

## Локальный запуск проекта

Запуск проекта на локальном сервере (http://localhost:3000/) производится командой _npm start_.\
Установить необходимые для запуска модули Node.js можно командой _npm i_.
