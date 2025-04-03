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

  function handleShowForm() {
    setShow((show) => !show);
    console.log("button was clicked", show);
  }

  function handleAddFriend(friend) {
    setNewFriends((friends) => [...friends, friend]);
    setShow(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList newFriends={newFriends} />
        {show && <FormAddFriend onaddFriend={handleAddFriend} />}
        <Button onaddFriendForm={handleShowForm}>
          {!show ? "Add Friend" : "Close"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList({ newFriends }) {
  if (newFriends.length >= 7) {
    return (
      <>
        {" "}
        <div>Max number of users is 7</div>
        <Button disabled> add Friend </Button>
      </>
    );
  }

  return (
    <ul>
      {newFriends.map((friend) => {
        return <Friend friend={friend} key={friend.id} />;
      })}
    </ul>
  );
}

function Friend({ friend }) {
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

      <Button>Select</Button>
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

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X </h2>
      <label> 💰 Bill value</label>
      <input type="text" />
      <label>🧍 Your expense</label>
      <input type="text" />
      <label> 🧑‍🤝‍🧑 X's expenses </label>
      <input type="text" disabled />
      <label> 🤑 Who is paying the bill </label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
