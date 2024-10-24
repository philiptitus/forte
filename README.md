Forte
Table of Contents

    Project Description
    Installation
    Usage
    Running Tests
    Technologies Used
    Contributing
    License

Project Description

Forte is a Django-based project designed to streamline student hostel bookings.


Installation

    Clone the repository:

    sh

git clone https://github.com/philiptitus/forte.git
cd forte

Create and activate a virtual environment:

sh

python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install dependencies:

sh

pip install -r requirements.txt

Set up the database:

sh

python manage.py migrate

Create a superuser:

sh

python manage.py createsuperuser

Run the development server:

sh

    python manage.py runserver

Usage

    Access the project at http://127.0.0.1:8000/.
    Admin interface: http://127.0.0.1:8000/admin/



Running Tests

To run tests, use the following command:

sh

python manage.py test

Technologies Used

    Python
    Django
    Django REST Framework
    PostgreSQL


Contributing

Contributions are welcome! Please follow these steps:

    Fork the repository
    Create a new branch (git checkout -b feature/your-feature)
    Commit your changes (git commit -am 'Add some feature')
    Push to the branch (git push origin feature/your-feature)
    Create a new Pull Request

License

This project is licensed under the MIT License. See the LICENSE file for details.