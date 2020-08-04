export const defaultLocales: Record<string, Record<string, string>> = {
    en: {
        every: "Every",
        mminutes: "minute(s)",
        hoursOnMinute: "hour(s) on minute",
        daysAt: "day(s) at",
        at: "at",
        onThe: "On the",
        dayOfEvery: "day, of every",
        monthsAt: "month(s), at",
        everyDay: "Every",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
        hasToBeBetween: "Has to be between",
        and: "and",
        minutes: "MINUTES",
        hourly: "HOURLY",
        daily: "DAILY",
        weekly: "WEEKLY",
        monthly: "MONTHLY",
        advanced: "ADVANCED",
        cronExpression: "Cron expression:"
    },
    pl: {
        every: "Co",
        mminutes: "minut",
        hoursOnMinute: "godzin w minucie",
        daysAt: "dni o",
        at: "o",
        onThe: "",
        dayOfEvery: "dzień miesiąca, co",
        monthsAt: "miesięcy, o godzinie",
        everyDay: "W każdy",
        mon: "Pon",
        tue: "Wt",
        wed: "Śr",
        thu: "Czw",
        fri: "Pt",
        sat: "So",
        sun: "Nie",
        hasToBeBetween: "Wymagana wartość pomiędzy",
        and: "i",
        minutes: "Minuty",
        hourly: "Godziny",
        daily: "Dni",
        weekly: "Tygodnie",
        monthly: "Miesiące",
        advanced: "Zaawansowane",
        cronExpression: "Wyrażenie cron:"
    },
    pt: {
        every: "A cada",
        mminutes: "minuto(s)",
        hoursOnMinute: "horas(s) deste minuto",
        daysAt: "dias(s) às",
        at: "às",
        onThe: "No ",
        dayOfEvery: "dia, de todos",
        monthsAt: "mês(es), às",
        everyDay: "Todo(a)",
        mon: "Seg",
        tue: "Ter",
        wed: "Qua",
        thu: "Qui",
        fri: "Sex",
        sat: "Sab",
        sun: "Dom",
        hasToBeBetween: "Deve ser entre",
        and: "e",
        minutes: "MINUTOS",
        hourly: "HORAS",
        daily: "DIÁRIO",
        weekly: "SEMANAL",
        monthly: "MENSAL",
        advanced: "AVANÇADO",
        cronExpression: "Expressão cron:"
    }
};

export function toCronstrueLocale(locale: string) {
    if (locale == "pt") return "pt_BR";
    else return locale;
}

export function createI18n(
    customLocales: Record<string, Record<string, string>>,
    locale: string
): Record<string, string> {
    const allLocales = { ...defaultLocales, ...customLocales };
    return allLocales[locale] || allLocales["en"];
}
