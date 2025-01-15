# **API Project**

Dit project is een data-driven API gemaakt met Node.js, Express, en MySQL. Het biedt CRUD-functionaliteit voor gebruikersbeheer en nieuwsberichtenbeheer, inclusief validatie, zoekfunctionaliteit, paginering en basisauthenticatie.

---

## **Inhoud**
- [Projectvereisten](#projectvereisten)
- [Installatie](#installatie)
- [Hoe te gebruiken](#hoe-te-gebruiken)
- [Belangrijke Functionaliteiten](#belangrijke-functionaliteiten)
  - [Gebruikersbeheer](#gebruikersbeheer)
  - [Nieuwsbeheer](#nieuwsbeheer)
  - [Authenticatie](#authenticatie)
  - [Zoeken en Paginering](#zoeken-en-paginering)
- [Bronvermeldingen](#bronvermeldingen)

---

## **Projectvereisten**
- **Node.js** (versie 18 of hoger)
- **MySQL** (met een bestaande databaseconfiguratie)
- **Een browser** (om frontendpagina's te bekijken)

---

## **Installatie**

1. **Clone de repository**
```bash
git clone <repository-URL>
```
2. **Navigeer naar de projectmap**:
```bash
cd BackendWeb-Node.js
```

3. **Installeer de benodigde dependencies**:
```bash
npm install
```

4. **Configureer de database**;
```bash
mysql -u root -p my_api_database < database/my_api_database.sql
```

5. **Configureer de .env-file**;
```bash
DB_HOST=localhost
DB_DATABASE=my_api_database
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_PORT=3306
```

6. **Start de server**;
```bash
node src/app.js
```

## **Hoe te gebruiken**

### **Documentatiepagina bekijken**
Open de volgende URL in je browser: [http://localhost:3000](http://localhost:3000)

### **Gebruikersbeheer**
Beheer gebruikers via de frontend: [http://localhost:3000/users.html](http://localhost:3000/users.html)

#### **Endpoints**
- **GET /users**: Haalt een lijst op van alle gebruikers (met paginering via `limit` en `offset`).
- **GET /users/:id**: Haalt details op van een specifieke gebruiker.
- **POST /users**: Voegt een nieuwe gebruiker toe.
  - **Validatie**:
    - Naam (minimaal 3 tekens, geen cijfers)
    - Geldig e-mailadres
    - Wachtwoord (minimaal 8 tekens)
- **PUT /users/:id**: Wijzigt een bestaande gebruiker.
- **DELETE /users/:id**: Verwijdert een bestaande gebruiker.

---

### **Nieuwsberichtenbeheer**
Beheer nieuwsberichten via de frontend: [http://localhost:3000/news.html](http://localhost:3000/news.html)

#### **Endpoints**
- **GET /news**: Haalt een lijst op van alle nieuwsberichten (met paginering via `limit` en `offset`).
- **GET /news/:id**: Haalt details op van een specifiek nieuwsbericht.
- **GET /news/search**: Zoekt naar nieuwsberichten op titel.
- **POST /news**: Voegt een nieuw nieuwsbericht toe.
  - **Validatie**:
    - Titel (minimaal 5 tekens)
    - Inhoud (minimaal 10 tekens)
    - Optionele afbeelding-URL (geldig URL-formaat)
- **PUT /news/:id**: Wijzigt een bestaand nieuwsbericht.
- **DELETE /news/:id**: Verwijdert een bestaand nieuwsbericht.

---

### **Authenticatie**
- Beveiligde routes kunnen worden toegevoegd met behulp van JWT (nog niet geïmplementeerd).
- Alleen admingebruikers kunnen specifieke acties uitvoeren zoals het toevoegen/verwijderen van nieuwsberichten.

---

### **Zoeken en Paginering**
- **Zoeken**:
  - **Gebruikers**: `/users/search?name=keyword`
  - **Nieuwsberichten**: `/news/search?title=keyword`
- **Paginering**:
  - Gebruik `limit` en `offset` in de URL-query voor zowel gebruikers als nieuwsberichten.
    - Voorbeeld: `/users?limit=5&offset=10`
    - Voorbeeld: `/news?limit=10&offset=20`
