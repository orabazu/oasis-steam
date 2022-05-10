import './Gamer.scss';

import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

const Gamer = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:3001/getTransactions');
    const json = await res.json();

    setTransactions(json);
  };

  const earned = transactions
    .filter((transaction) => transaction.transactionType !== 'Reward')
    .reduce(
      (prev, curr) => prev + (curr.tokenToClaim ? curr.tokenToClaim : curr.amount),
      0,
    );

  const exchanged = transactions
    .filter((transaction) => transaction.transactionType === 'Swap')
    .reduce((prev, curr) => prev + curr.amount, 0);

  const balance = earned - exchanged;

  return (
    <Row className="Gamer">
      <Col span={8}>
        <div className="address-info">
          <h2>My Gamer NFT</h2>
          <h3>0x7c4571600008ad0aeD614652c39884E6EE8C17aE</h3>
        </div>

        <div className="account-summary">
          <h2>My Account Summary</h2>
          <h3>
            Total TILE Received:{' '}
            <span className="account-summary__earned">{earned} TILE</span>
          </h3>
          <h3>
            TILE Exchanged for Rose:{' '}
            <span className="account-summary__exchanged">-{exchanged} TILE</span>
          </h3>
          <h3>
            Current Balance:{' '}
            <span className="account-summary__balance">{balance} TILE</span>
          </h3>
        </div>
      </Col>
      <Col span={16}>
        <div className="transactions">
          <h2 className="transactions__title">Transaction History</h2>
          <div className="table">
            <div className="table__title">
              <ul>
                <li>Transaction</li>
                <li>Type</li>
                <li>Date</li>
                <li>Amount(TILE)</li>
                <li>Game</li>
              </ul>
              <section className="transactions__rows">
                {transactions &&
                  [...transactions].reverse().map((transaction: any) => (
                    <article
                      className={`row ${
                        transaction.transactionType === 'Swap' ? 'row--red' : 'row--green'
                      }`}
                      key={transaction._id}
                    >
                      <ul className="shown-content">
                        <li>
                          <a
                            target="_blank"
                            className="oasis-link"
                            href={`https://testnet.oasisscan.com/paratimes/transactions/${transaction.transactionId}?runtime=00000000000000000000000000000000000000000000000072c8215e60d5bca7`}
                          >
                            OASIS SCAN
                          </a>
                        </li>
                        <li>{transaction.transactionType}</li>
                        <li>{transaction.date}</li>
                        <li>{`${
                          transaction.transactionType === 'Reward'
                            ? `${transaction.tokenToClaim}`
                            : transaction.transactionType === 'Test'
                            ? `${transaction.amount}`
                            : transaction.transactionType === 'Buy'
                            ? `${transaction.amount}`
                            : `-${transaction.amount}`
                        } 
                         `}</li>
                        <li>{transaction.game && transaction.game}</li>
                      </ul>

                      <ul className="hidden-content">
                        <li>
                          From
                          <span>{transaction.from}</span> to <span>{transaction.to}</span>
                        </li>
                      </ul>
                    </article>
                  ))}
              </section>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Gamer;
