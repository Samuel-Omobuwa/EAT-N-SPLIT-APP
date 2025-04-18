import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onaddFriendForm, children }) {
  return (
    <button className="button" onClick={onaddFriendForm}>
      {children}
    </button>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [newFriends, setNewFriends] = useState(initialFriends);
  const [friendSelected, setFriendSelected] = useState(null);

  function handleShowForm() {
    setShow((show) => !show);
    console.log("button was clicked", show);
  }

  function handleAddFriend(friend) {
    setNewFriends((friends) => [...friends, friend]);
    setShow(false);
  }

  function handleSelection(friend) {
    // setFriendSelected(friend);
    setFriendSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShow(false);
  }

  function handleSplitBill(value) {}
  setNewFriends((friends) =>
    friends.map((friend) =>
      friend.id === friendSelected.id
        ? { ...friend, balance: friend.balance + value }
        : friend
    )
  );
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          newFriends={newFriends}
          onSelection={handleSelection}
          friendSelected={friendSelected}
        />

        {show && <FormAddFriend onaddFriend={handleAddFriend} />}

        <Button onaddFriendForm={handleShowForm}>
          {!show ? "Add Friend" : "Close"}
        </Button>
      </div>

      {friendSelected && (
        <FormSplitBill
          friendSelected={friendSelected}
          onSplitBill={handleSplitBill}
          key={friendSelected.id}
        />
      )}
    </div>
  );
}

function FriendsList({ newFriends, onSelection, friendSelected }) {
  return (
    <ul>
      {newFriends.map((friend) => {
        return (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            friendSelected={friendSelected}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, onSelection, friendSelected }) {
  const isSelected = friendSelected?.id === friend.id;

  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {" "}
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance == 0 && <p> You and {friend.name} are even </p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}

      <button className="button" onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend({ onaddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onaddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48?u");
  }

  return (
    <form action="" className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 🖼️ image URL </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friendSelected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");

  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByFriend);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friendSelected.name} </h2>
      <label> 💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(Number(e.target.value)) > bill
            ? paidByUser
            : Number(e.target.value)
        }
      />

      <label> 🧑‍🤝‍🧑 {friendSelected.name}'s expenses </label>
      <input type="text" value={paidByFriend} />

      <label> 🤑 Who is paying the bill </label>
      <select
        name=""
        id=""
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friendSelected.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
