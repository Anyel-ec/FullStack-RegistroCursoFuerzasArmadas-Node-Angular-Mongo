class User {
    constructor(username, id_rol, fullName, password, email, state) {
        this.username = username; // anyelec
        this.id_rol = id_rol; // 2: Operador
        this.fullName = fullName; // Nombre completo
        this.password = password; // encrypted 
        this.email = email;
        this.state = state; // 0: inactive, 1: active
    }
}

module.exports = User;
