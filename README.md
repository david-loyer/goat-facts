# Daily Goat Facts

Send a  goat fact to a phone number.

## Installation

Install packages

```bash
npm install
```

Create `.env` file, then modify the values

```bash
cp .env.example .env
```

Populate database

Create the database then run:

```bash
mysql <db_name> install/create_tables.sql
mysql <db_name> install/initial_facts.sql
```