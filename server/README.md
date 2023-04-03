# .env

###### CLIENT_URL
###### PORT
###### DATABASE_URL
###### TOKEN_EXPIRATION
###### ACCESS_TOKEN_SECRET_KEY
###### REFRESHH_TOKEN_SECRET_KEY



# Endpoints

| APARTMENT |                  |                                    |
|-----------|------------------|------------------------------------|
| post      | New Apartment    | {{url}}/apartment                  |
| get       | Get Apartment    | {{url}}/apartment/:id              |
| get       | Last Actions     | {{url}}/apartment/lastTransactions |
| put       | Update Apartment | {{url}}/apartment                  |
| AUTH |                            |                                          |
|------|----------------------------|------------------------------------------|
| post | Register                   | {{url}}/auth/register                    |
| post | Login                      | {{url}}/auth/login                       |
| post | Residents Register         | {{url}}/auth/residentsRegister           |
| post | Residents Username Control | {{url}}/auth/newResidentsUsernameControl |
| post | Resident Login             | {{url}}/auth/residentLogin               |
| put  | Update Residents Auth      | {{url}}/auth/updateResidentsAuth         |
| DEBT   |             |                             |
|--------|-------------|-----------------------------|
| post   | New Debt    | {{url}}/debt/newDebt        |
| get    | List Debts  | {{url}}/debt/listDebts      |
| delete | Delete Debt | {{url}}/debt/deleteDebt/:id |
| DUES |                           |                                    |
|------|---------------------------|------------------------------------|
| post | Pay Dues                  | {{url}}/dues/payDues/:id           |
| get  | Add Dues to All Residents | {{url}}/dues/addDuesToAllResidents |
| get  | Get Dues                  | {{url}}/dues/getDues               |
| get  | UnPaid Dues               | {{url}}/dues/unPaidDues            |
| EXPENSES |                |                                   |
|----------|----------------|-----------------------------------|
| post     | New Expense    | {{url}}/expense/newExpense        |
| get      | Get Expenses   | {{url}}/expense/getExpenses       |
| delete   | Delete Expense | {{url}}/expense/deleteExpense/:id |
| Resident |                 |                                    |
|----------|-----------------|------------------------------------|
| post     | New Resident    | {{url}}/resident                   |
| get      | List Residensts | {{url}}/resident/listResidents/:id |
| delete   | Delete Resident | {{url}}/resident/:id               |

