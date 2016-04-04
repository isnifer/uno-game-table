import React from 'react';
import ReactDOM from 'react-dom';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valuesVisible: false,
            overall: 0,
        };

        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.addValues = this.addValues.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.setState({valuesVisible: true});
    }

    onBlur({target: {value}}) {
        this.setState({overall: this.state.overall + parseInt(value, 10)});
    }

    addValues() {
        this.props.onClick(this.props.index, this.state.overall);
        this.setState({overall: 0, valuesVisible: false});
    }

    render() {
        const {name, value} = this.props.item;
        const users = this.props.users.filter((item, index) => index !== this.props.index);

        return (
            <div className="user">
                <span>{name}: {value} {' '}</span>
                <span className="user__add" onClick={this.onClick}>Add</span>
                {this.state.valuesVisible &&
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {users.map((item, index) => {
                            return (
                                <input
                                    type="text"
                                    onBlur={this.onBlur}
                                    defaultValue=""
                                    placeholder={item.name}
                                    key={index}
                                />
                            );
                        })}
                        <button type="button" onClick={this.addValues}>Add Values</button>
                    </div>
                }
            </div>
        );
    }
}

class Uno extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: props.users || [],
            currentName: null,
        };

        this.addUser = this.addUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addValues = this.addValues.bind(this);
    }

    addUser(event) {
        event.preventDefault();

        this.setState({
            users: this.state.users.concat({name: this.state.currentName, value: 0}),
            currentName: null,
        });
    }

    onChange(event) {
        event.preventDefault();

        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    addValues(index, sum) {
        const user = this.state.users[index];
        const users = [
            ...this.state.users.slice(0, index),
            {name: user.name, value: user.value + sum},
            ...this.state.users.slice(index + 1),
        ]

        const stringUsers = JSON.stringify(users);
        console.log(stringUsers);
        localStorage.setItem('users', stringUsers);
        this.setState({users});
    }

    render() {
        return (
            <div className="table">
                <div className="table__part">
                    <form className="form" noValidate>
                        <div className="form__group">
                            <input
                                type="text"
                                name="currentName"
                                onChange={this.onChange}
                                value={this.state.currentName}
                            />
                        </div>
                        <div className="form__group">
                            <button type="submit" onClick={this.addUser} disabled={!this.state.currentName}>
                                Add User
                            </button>
                        </div>
                    </form>
                </div>
                <div className="table__part">
                    {this.state.users.map((item, index) => {
                        return (
                            <User
                                item={item}
                                index={index}
                                key={index}
                                users={this.state.users}
                                onClick={this.addValues}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}


const tmpUsers = localStorage.getItem('users');
let lsUsers = [];

try {
    lsUsers = JSON.parse(tmpUsers);
} catch (e) {
    lsUsers = [];
}

ReactDOM.render(<Uno users={lsUsers} />, document.getElementById('react-app'));
