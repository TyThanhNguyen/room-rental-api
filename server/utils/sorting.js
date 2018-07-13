// list of sort algorithms are using in project.

// insert sort.
const compare = (a, b) => {
    if (a.distances[0].durationValue < b.distances[0].durationValue) {
        return -1;
    }
    if (a.distances[0].durationValue > b.distances[0].durationValue) {
        return 1;
    }
    return 0;
}

module.exports = { compare };