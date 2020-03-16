export default {
    withRegisteredLocales(locales: Object) {
        if (!locales) return {...this};
        return { ...this, ...locales };
    },

    en: {
        every: "Every",
        mminutes: "minute(s)",
        hoursOnMinute: "hour(s) on minute",
        daysAt: "day(s) at",
        at: "at",
        onThe: "On the",
        dayOfEvery: "day of every",
        monthsAt: "month(s) at",
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
        advanced: "ADVANCED"
    },
    pl: {
        every: "Co",
        mminutes: "minut",
        hoursOnMinute: "godzin w minucie",
        daysAt: "dni o",
        at: "o",
        onThe: "",
        dayOfEvery: "dzień każdych",
        monthsAt: "miesięcy o",
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
        minutes: "MINUTY",
        hourly: "GODZINY",
        daily: "DNI",
        weekly: "TYGODNIE",
        monthly: "MIESIĄCE",
        advanced: "ZAAWANSOWANE"
    }
};
