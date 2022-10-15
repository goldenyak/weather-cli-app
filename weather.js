#!/usr/bin/env node
import {getArgs} from "./helpers/args.helper.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";


const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess(` Токен "${token}" сохранен! `)
    } catch (error) {
        printError(error.message)
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('Не передан город')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess(` Город "${city}" сохранен! `)
    } catch (error) {
        printError(error.message)
    }
}

const getForcast = async () => {
    try {

        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        await printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (error) {
        if (error?.response?.status === 404) {
            printError('Неверно указан город поиска!')
        } else if (error?.response?.status === 401) {
            printError('Неверно указан токен!')
        } else {
            printError(error.message)
        }
    }

}

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.c) {
        return saveCity(args.c)
    }
    if (args.h) {
        return printHelp();
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForcast()

}

initCli();