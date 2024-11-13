# Forte Hostel Management System

---

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

**Forte** is a powerful Django-based application designed to simplify student hostel bookings. It provides a seamless experience for students to find, book, and manage their hostel accommodations, while hostel administrators benefit from an efficient management system.

---

## Installation

To get started with **Forte**, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/philiptitus/forte.git
   cd forte
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database:**

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser for admin access:**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

---

## Usage

Once the server is running:

- Access the project at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
- Use the admin interface at [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) to manage bookings, users, and other application data.

---

## Running Tests

To run tests for **Forte**, execute:

```bash
python manage.py test
```

---

## Technologies Used

- **Python**  
- **Django**  
- **Django REST Framework**  
- **PostgreSQL**  

---

## Contributing

We welcome contributions to **Forte Hostel Management System**! To contribute:

1. Fork the repository.
2. Create a new branch for your feature:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -am 'Add some feature'
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Create a new Pull Request for review.

---

## License

This project is licensed under the MIT License. See the LICENSE file for full details.

---

© Philip Titus 2023
