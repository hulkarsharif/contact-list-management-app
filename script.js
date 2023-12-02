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

    openUpdatePopup(id) {
        const existingContactLists = this.get();
        const contact = existingContactLists.find(
            (contact) => contact.id === id
        );
        document.getElementById("updateFirstName").value = contact.firstName;
        document.getElementById("updateLastName").value = contact.lastName;

        document.getElementById("updateEmail").value = contact.email;
        document.getElementById("updateLinkedInProfile").value =
            contact.linkedInProfile;
        document.getElementById("updatePhoneNumber").value =
            contact.phoneNumber;
        document.getElementById("updatePopup").style.display = "block";
    }

    saveUpdatedContact() {
        const existingContactLists = this.get();
        const index = existingContactLists.findIndex(
            (c) => c.email === document.getElementById("updateEmail").value
        );
        if (index !== -1) {
            existingContactLists[index] = {
                firstName: document.getElementById("updateFirstName").value,
                lastName: document.getElementById("updateLastName").value,
                email: document.getElementById("updateEmail").value,
                linkedInProfile: document.getElementById(
                    "updateLinkedInProfile"
                ).value,
                phoneNumber: document.getElementById("updatePhoneNumber").value
            };
            this.setContactLists(existingContactLists);
            app.loadContacts();
            this.closeUpdatePopup();
        }
    }

    closeUpdatePopup() {
        document.getElementById("updatePopup").style.display = "none";
    }

    setContactLists(updatedContactLists) {
        localStorage.setItem(
            "contactLists",
            JSON.stringify(updatedContactLists)
        );
    }
}
const storage = new Storage();

class ContactListApp {
    static tableBody = document.querySelector(".contactLists");

    deleteContact = (id) => {
        storage.delete(id);
    };

    addContact = (contact) => {
        storage.add(contact);
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

        const buttonsTd = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.style.cursor = "pointer";
        editButton.style.backgroundColor = "blue";
        editButton.style.color = "#fff";
        editButton.style.border = "none";
        editButton.style.borderRadius = "5px";
        editButton.style.padding = "8px 12px";
        editButton.style.width = "50px";
        editButton.style.marginRight = "12px";

        editButton.addEventListener("click", () => {
            storage.openUpdatePopup(id);
            this.loadContacts;
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.backgroundColor = "#ff5555";
        deleteButton.style.color = "#fff";
        deleteButton.style.border = "none";
        deleteButton.style.borderRadius = "6px";
        deleteButton.style.padding = "10px 12px";
        deleteButton.style.width = "65px";

        deleteButton.addEventListener("click", (e) => {
            this.deleteContact(id);
            this.loadContacts();
        });

        const saveButton = document.getElementById("saveButton");
        saveButton.addEventListener("click", () => {
            storage.saveUpdatedContact();
        });
        const cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", () => {
            document.getElementById("updatePopup").style.display = "none";
        });
        buttonsTd.appendChild(editButton);
        buttonsTd.appendChild(deleteButton);
        tr.appendChild(buttonsTd);
        ContactListApp.tableBody.appendChild(tr);
    };

    loadContacts = () => {
        ContactListApp.tableBody.innerHTML = "";
        const contactLists = storage.get();
        for (const contact of contactLists) {
            this.createContact(contact);
        }
    };

    initForm = () => {
        const form = document.querySelector("#contactForm");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const id = crypto.randomUUID();

            const firstName = document.querySelector("#firstName").value;
            const lastName = document.querySelector("#lastName").value;
            const email = document.querySelector("#email").value;
            const linkedInProfile =
                document.querySelector("#linkedInProfile").value;
            const phoneNumber = document.querySelector("#phoneNumber").value;

            const contact = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                linkedIn: linkedInProfile, // Changed the field name
                phoneNumber: phoneNumber
            };

            this.addContact(contact);

            form.reset();
            this.loadContacts();
        });
    };

    init = () => {
        this.loadContacts();
        this.initForm();
    };
}

const app = new ContactListApp();
app.init();
