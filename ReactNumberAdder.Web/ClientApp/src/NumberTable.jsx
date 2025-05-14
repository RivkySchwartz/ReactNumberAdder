import React from 'react';
import NumberRow from './NumberRow';
import NumberForm from './NumberForm';
import SelectedNumbers from './SelectedNumbers';
import randomNumber from 'random-number-in-range';
import { produce } from 'immer';

let id = 1;
class NumberTable extends React.Component {

    state = {
        numbers: [],
        currentNumber: {
            number: randomNumber(1, 1000),
            numId: id
        },
        selectedNums: [],
        lockedNumbers: []
    };

    onAddClicked = () => {
        const { number, numId } = this.state.currentNumber;
        id++;
        const nextState = produce(this.state, draft => {
            draft.numbers.push({ number, numId });
            draft.currentNumber = {
                number: randomNumber(1, 1000),
                numId: id
            }

        });

        this.setState(nextState);
    }

    onLockedClick = (n) => {
        const nextState = produce(this.state, draft => {
            const isLocked = draft.lockedNumbers.some(x => x.numId === n.numId);

            if (isLocked) {
                draft.lockedNumbers = draft.lockedNumbers.filter(x => x.numId !== n.numId);
            } else {
                draft.lockedNumbers.push(n);
            }
        });

        this.setState(nextState);
    };

    onSelectClick = (n) => {
        const { selectedNums } = this.state;

        if (selectedNums.includes(n.numId)) {
            this.setState({ selectedNums: selectedNums.filter(id => id !== n.numId) });
        } else {
            this.setState({ selectedNums: [...selectedNums, n.numId] });
        }

    }

    getSelectedNums = () => {
        const { selectedNums, numbers, lockedNumbers } = this.state;

        if (!selectedNums.length) return null;

        const selected = numbers.filter(n => selectedNums.includes(n.numId));

        return (
            <div className="row p-5 rounded">
                <div className="col-md-6 col-md-offset-3">
                    <h3>Selected Numbers</h3>
                    <ul className="list-group">
                        {selected.map((n) => (
                            <SelectedNumbers
                                key={n.numId}
                                number={n.number}
                                isLocked={lockedNumbers.some(l => l.numId === n.numId)}
                                onLockClick={() => this.onLockedClick(n)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    getContent = () => {
        return (
            <div style={{ maxHeight: 500, overflowY: 'scroll' }}>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.numbers.map((n) => {
                            const isLocked = this.state.lockedNumbers.some(l => l.numId === n.numId);
                            return (
                                <NumberRow
                                    key={n.numId}
                                    number={n.number}
                                    onSelectClick={() => this.onSelectClick(n)}
                                    isSelected={this.state.selectedNums.includes(n.numId)}
                                    disabled={isLocked}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }


    render() {
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <NumberForm
                    onAddClicked={this.onAddClicked}>
                </NumberForm>
                <div>
                    {this.getContent()}
                    {this.getSelectedNums()}
                </div>

            </div>
        );

    }
}

export default NumberTable;
