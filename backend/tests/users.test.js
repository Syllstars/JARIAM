const request = require("supertest");
const app = require("../server");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../services/userService");
const { auth, hasRole } = require("../middleware/authentification");
const Users = require("../models/user");
const bcrypt = require("bcryptjs");

jest.mock("../services/userService"); // Mock du service utilisateur
jest.mock("../middleware/authentification"); // Mock des middlewares d'authentification
jest.mock("../models/user");

jest.mock("../middleware/authentification", () => ({
    auth: jest.fn((req, res, next) => next()), // Simule toujours un utilisateur connecté
    hasRole: jest.fn(() => (req, res, next) => next()), // Simule toujours un admin
}));


describe("🔹 TESTS API USERS", () => {
    const mockUser = {
        id: 1,
        username: "JARIAM",
        hashed_password: bcrypt.hashSync("jariam_adm", 10),
        role: "Admin",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ✅ Test GET /users (Admin uniquement)
    test("✔️ Admin peut récupérer la liste des utilisateurs", async () => {
        hasRole.mockImplementation(() => (req, res, next) => {
            req.user = { id: 1, role: "admin" }; // Simule un admin
            next();
        });
        getAllUsers.mockResolvedValue([mockUser]); // Simule une réponse de la BDD

        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockUser]);
    });

    // ✅ Test GET /users/:id (Récupération d'un utilisateur spécifique)
    test("✔️ Un utilisateur peut récupérer ses informations", async () => {
        auth.mockImplementation((req, res, next) => {
            req.user = { id: 1, role: "Employee" };
            next();
        });
        getUserById.mockResolvedValue(mockUser);

        const response = await request(app)
            .get("/api/users/1")
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    // ❌ Test GET /users/:id (Utilisateur non trouvé)
    test("❌ Retourne 404 si l'utilisateur n'existe pas", async () => {
        getUserById.mockResolvedValue(null);

        const response = await request(app)
            .get("/api/users/99")
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found" });
    });

    // ✅ Test PUT /users/:id (Mise à jour d'un utilisateur)
    test("✔️ Un utilisateur peut mettre à jour son profil", async () => {
        updateUser.mockResolvedValue({ ...mockUser, email: "newemail@example.com" });

        const response = await request(app)
            .put("/api/users/1")
            .send({ email: "newemail@example.com" })
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...mockUser, email: "newemail@example.com" });
    });

    // ❌ Test PUT /users/:id (Utilisateur non trouvé)
    test("❌ Retourne 404 si l'utilisateur à mettre à jour n'existe pas", async () => {
        updateUser.mockResolvedValue(null);

        const response = await request(app)
            .put("/api/users/99")
            .send({ email: "newemail@example.com" })
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found" });
    });

    // ✅ Test DELETE /users/:id (Suppression d'un utilisateur - Admin uniquement)
    test("✔️ Un admin peut supprimer un utilisateur", async () => {
        hasRole.mockImplementation(() => (req, res, next) => {
            req.user = { id: 1, role: "admin" }; // Simule un admin
            next();
        });
        deleteUser.mockResolvedValue(true);

        const response = await request(app)
            .delete("/api/users/1")
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(204);
    });

    // ❌ Test DELETE /users/:id (Utilisateur non trouvé)
    test("❌ Retourne 404 si l'utilisateur à supprimer n'existe pas", async () => {
        deleteUser.mockResolvedValue(null);

        const response = await request(app)
            .delete("/api/users/99")
            .set("Authorization", "Bearer faketoken");

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found" });
    });

    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Attente pour éviter Jest did not exit
    });

});
