const jsonData = `
{
  "users": [
    {
      "id": 1,
      "firstName": "Chester",
      "lastName": "Francisco",
      "employeeId": "23-01",
      "sex": "Male",
      "dob": "1990-01-01",
      "roleId": 1,
      "email": "chester.francisco@example.com"
    },
    {
      "id": 2,
      "firstName": "Ma. Lotuslei",
      "lastName": "Dimagiba",
      "employeeId": "23-02",
      "sex": "Female",
      "dob": "1992-05-12",
      "roleId": 2,
      "email": "lotuslei.dimagiba@example.com"
    },
    {
      "id": 3,
      "firstName": "Carmela",
      "lastName": "Aguisanda",
      "employeeId": "23-03",
      "sex": "Female",
      "dob": "1992-05-12",
      "roleId": 3,
      "email": "carmela.aguisanda@example.com"
    },
    {
      "id": 4,
      "firstName": "Resty",
      "lastName": "Balila",
      "employeeId": "23-04",
      "sex": "Female",
      "dob": "1992-05-12",
      "roleId": 3,
      "email": "resty.balila@example.com"
    },
    {
      "id": 5,
      "firstName": "Dessa",
      "lastName": "Maderal",
      "employeeId": "23-02",
      "sex": "Female",
      "dob": "1992-05-12",
      "roleId": 3,
      "email": "dessa.maderal@example.com"
    },
    {
      "id": 6,
      "firstName": "Zhairyn",
      "lastName": "Bengwayan",
      "employeeId": "CO-23-01",
      "sex": "Female",
      "dob": "1992-05-12",
      "roleId": 4,
      "email": "zhairyn.bengwayan@example.com"
    }
  ]
}
`;

export const usersDb = JSON.parse(jsonData);
