class Register { 
    constructor(identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote){
        this.identification = identification;
        this.phone = phone;
        this.email = email;
        this.name = name;
        this.birthdate = birthdate;
        this.id_province = id_province;
        this.address = address;
        this.id_gender = id_gender;
        this.id_commandType = id_commandType;
        this.gradeNote = gradeNote;
    }
}

module.exports = Register;