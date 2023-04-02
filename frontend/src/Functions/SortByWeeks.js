const SortByWeeks = (weeks) => {

    weeks.sort((a, b) => {

        const numA = parseInt(a.name.replace('week', ''));
        const numB = parseInt(b.name.replace('week', ''));

        return numA - numB;
    });

    return (weeks);
}

export default SortByWeeks;