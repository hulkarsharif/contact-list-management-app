class Storage {
    get() {
        const contactLists = localStorage.getItem("contactLists");
        if (!contactLists) return [];
        return JSON.parse(contactLists);
    }

    add(contact) {
        const existingContactLists = this.get();
        existingContactLists.push(contact);
        this.setContactLists(existingContactLists);
    }

    delete(id) {
        const existingContactLists = this.get();
        const keptContactLists = existingContactLists.filter(
            (contact) => contact.id !== id
        );
        this.setContactLists(keptContactLists);
    }

    setContactLists(updatedContactLists) {
        localStorage.setItem(
            "contactLists",
            JSON.stringify(updatedContactLists)
        );
    }
}

const storage = new Storage();

class ContactListsApp {
    static tableBody = document.querySelector(".contactLists");

    addContact = (contact) => {
        storage.add(contact);
        this.createContactLists();
    };

    getAll() {
        return storage.get();
    }

    createContact = ({
        id,
        firstName,
        lastName,
        email,
        linkedInProfile,
        phoneNumber
    }) => {
        const tr = document.createElement("tr");

        const idTd = document.createElement("td");
        idTd.innerText = id;
        tr.appendChild(idTd);

        const firstNameTd = document.createElement("td");
        firstNameTd.innerText = firstName;
        tr.appendChild(firstNameTd);

        const lastNameTd = document.createElement("td");
        lastNameTd.innerText = lastName;
        tr.appendChild(lastNameTd);

        const emailTd = document.createElement("td");
        emailTd.innerText = email;
        tr.appendChild(emailTd);

        const linkedInProfileTd = document.createElement("td");
        linkedInProfileTd.innerText = linkedInProfile;
        tr.appendChild(linkedInProfileTd);

        const phoneNumberTd = document.createElement("td");
        phoneNumberTd.innerText = phoneNumber;
        tr.appendChild(phoneNumberTd);

        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "&times;";
        deleteIcon.style.cursor = "pointer";

        deleteIcon.addEventListener("click", (e) => {
            this.deleteContact(id);
        });

        tr.appendChild(deleteIcon);
        ContactListsApp.tableBody.appendChild(tr);

        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", (e) => {
            this.updateContact(contact);
        });
        tr.appendChild(updateButton);
    };
    createContactLists = () => {
        ContactListsApp.tableBody.innerHTML = "";
        const contactLists = this.getAll();
        for (const contact of contactLists) {
            this.createContact(contact);
        }
    };

    initForm = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const id = crypto.randomUUID();
            const firstName = document.querySelector("#firstNameInput").value;
            const lastName = document.querySelector("#lastNameInput").value;
            const email = document.querySelector("#emailInput").value;
            const linkedInProfile = document.querySelector(
                "#linkedInProfileInput"
            ).value;
            const phoneNumber =
                document.querySelector("#phoneNumberInput").value;

            const contact = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                linkedInProfile: linkedInProfile,
                phoneNumber: phoneNumber
            };

            this.addContact(contact);

            form.reset();
        });
    };

    init = () => {
        this.createContactLists();
        this.initForm();
        const storedContacts = storage.get();
        storedContacts.forEach((contact) => {
            this.createContact(contact);
        });
    };

    deleteContact = (id) => {
        storage.delete(id);
        this.createContactLists();
    };
}

const app = new ContactListsApp();
app.init();
