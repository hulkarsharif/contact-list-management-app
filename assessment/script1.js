class RenderTable {
    tableRender() {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tableRow = document.createElement("tr");

        createContact = ({ firstName, lastName, age }) => {
            const firstNameTd = document.createElement("td");
            firstNameTd.innerText = firstName;
            tr.appendChild(firstNameTd);

            const lastNameTd = document.createElement("td");
            lastNameTd.innerText = lastName;
            tr.appendChild(lastNameTd);

            const ageTd = document.createElement("td");
            ageTd.innerText = age;
            tr.appendChild(ageTd);
        };
    }
}
