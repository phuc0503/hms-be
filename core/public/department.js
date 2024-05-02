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

module.exports = toDepartment