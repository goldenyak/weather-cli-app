import chalk from 'chalk';
import dedent from "dedent-js";

export const printError = (error) => {
    console.log(chalk.bgRed.black.bold(' Error ' + ' ' + error))
}

export const printSuccess = (message) => {
    console.log(chalk.bgGreen.black.bold(' Success ' + ' ' + message))
}

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan.black(' HELP ')}
         Без параметров - вывод погоды
         -c [CITY] для установки города
         -h для вывода помощи
         -t [API_KEY] для сохранения токена
        `
    );
};

export const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgYellow.black(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
    );
};


