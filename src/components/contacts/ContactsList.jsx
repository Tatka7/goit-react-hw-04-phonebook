import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export default function ContactsList({ contacts, deleteContact }) {
  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.item}>
            <span className={css.data}>
              {name}:{number}
              <button
                type="button"
                className={css.button}
                onClick={() => deleteContact(id)}
              >
                Delete
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  // filterContacts: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
