const dayInMs = 24 * 60 * 60 * 1000;


function eachDate(startDate, endDate) {
    const dates = [];
    const s = new Date(startDate);
    const e = new Date(endDate);
    for (let d = new Date(s); d <= e; d = new Date(d.getTime() + dayInMs)) {
        dates.push(new Date(d));
    }
    return dates;
}


function findSpecialPriceForDate(date, specialDates, specialRanges) {
    const day = date.setHours(0, 0, 0, 0);
    for (const sd of specialDates || []) {
        const sdDay = new Date(sd.date).setHours(0, 0, 0, 0);
        if (sdDay === day) return sd.price;
    }


    for (const r of specialRanges || []) {
        const start = new Date(r.start).setHours(0, 0, 0, 0);
        const end = new Date(r.end).setHours(0, 0, 0, 0);
        if (day >= start && day <= end) return r.price;
    }


    return null;
}

function computeTotalPrice(startDate, endDate, hotel) {
    const nights = eachDate(startDate, new Date(endDate).getTime() - dayInMs);

    let total = 0;
    for (const night of nights) {
        const sp = findSpecialPriceForDate(
            night,
            hotel.specialDates || [],
            hotel.specialRanges || []
        );
        total += sp ?? hotel.defaultPrice;
    }

    return { total, nightsCount: nights.length };
}


module.exports = { computeTotalPrice };