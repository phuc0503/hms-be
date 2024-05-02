const dept = Object.freeze({
    INTERNAL_MEDICINE: 0,
    SURGERY: 1,
    PEDIATRICS: 2,
    OBSTETRICS: 3,
    OPHTHALMOLOGY: 4,
});

const toDepartment = (department) => {
    switch (department) {
        case dept.INTERNAL_MEDICINE:
            department = 'Khoa nội';
            break;
        case dept.SURGERY:
            department = 'Khoa ngoại';
            break;
        case dept.PEDIATRICS:
            department = 'Khoa nhi';
            break;
        case dept.OBSTETRICS:
            department = 'Khoa sản';
            break;
        case dept.OPHTHALMOLOGY:
            department = 'Khoa mắt';
            break;
        default:
            break;
    }

    return department;
}

const toNum = (department) => {
    switch (department) {
        case 'Khoa nội':
            department = dept.INTERNAL_MEDICINE;
            break;
        case 'Khoa ngoại':
            department = dept.SURGERY;
            break;
        case 'Khoa nhi':
            department = dept.PEDIATRICS;
            break;
        case 'Khoa sản':
            department = dept.OBSTETRICS;
            break;
        case 'Khoa mắt':
            department = dept.OPHTHALMOLOGY;
            break;
        default:
            break;
    }

    return department;
}

module.exports = {
    toDepartment,
    toNum
}