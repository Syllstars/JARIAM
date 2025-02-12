const request = require("supertest");
const app = require("../server"); // Assure-toi que ton serveur est bien exporté dans server.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/user"); // Mock du modèle utilisateur

jest.mock("../models/user"); // On mock le modèle Users

describe("🔹 TESTS API LOGIN", () => {
    const mockUser = {
        id: 1,
        username: "JARIAM",
        hashed_password: bcrypt.hashSync("jariam_adm", 10), // Simule un mot de passe hashé
        role: "admin",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("✔️ Connexion réussie avec un utilisateur valide", async () => {
        Users.findOne.mockResolvedValue(mockUser); // Simule l'existence d'un utilisateur

        const response = await request(app)
            .post("/login")
            .send({ username: "JARIAM", password: "jariam_adm" })
            .set("Accept", "application/json");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");

        const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
        expect(decodedToken).toMatchObject({
            id: mockUser.id,
            username: mockUser.username,
            role: mockUser.role,
        });
    });

    test("❌ Échec de connexion si l'utilisateur n'existe pas", async () => {
        Users.findOne.mockResolvedValue(null); // Simule un utilisateur inexistant

        const response = await request(app)
            .post("/login")
            .send({ username: "unknown", password: "password123" })
            .set("Accept", "application/json");

        expect(response.status).toBe(405);
        expect(response.body).toEqual({ message: "Utilisateur non trouvé" });
    });

    test("❌ Échec si le mot de passe est incorrect", async () => {
        Users.findOne.mockResolvedValue(mockUser); // Simule un utilisateur existant
        jest.spyOn(bcrypt, "compare").mockResolvedValue(false); // Simule un mauvais mot de passe

        const response = await request(app)
            .post("/login")
            .send({ username: "JARIAM", password: "wrongpassword" })
            .set("Accept", "application/json");

        expect(response.status).toBe(406);
        expect(response.body).toEqual({ message: "Mot de passe incorrect" });
    });

    test("❌ Requête invalide sans username ou password", async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "JARIAM" }) // Mot de passe manquant
            .set("Accept", "application/json");

        expect(response.status).toBe(406);
    });

    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Attente pour éviter Jest did not exit
    });

});
