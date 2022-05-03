import './Gamer.scss';

import { Col, Row } from 'antd';
import React from 'react';

const transactions = [
  {
    id: 'oasis...b5215',
    type: 'Reward',
    game: 'Crypto Cards',
    date: 'July 21, 2022',
    amount: '312',
    from: '0x...b5315',
    to: '0x...a6315',
  },

  {
    id: 'oasis...u2425',
    type: 'Withdrawal',
    game: '',
    date: 'June 13, 2022',
    amount: '1000',
    from: '0x...b5315',
    to: '0x...a6315',
  },

  {
    id: 'oasis...a6231',
    type: 'Reward',
    game: 'Crypto Shooter',
    date: 'May 25, 2022',
    amount: '717',
    from: '0x...b5315',
    to: '0x...a6315',
  },

  {
    id: 'oasis...s6312',
    type: 'Withdrawal',
    game: '',
    date: 'May 4, 2022',
    amount: '500',
    from: '0x...b5315',
    to: '0x...a6315',
  },

  {
    id: 'oasis...x3515',
    type: 'Reward',
    game: 'Crypto Cards',
    date: 'May 1, 2022',
    amount: '531',
    from: '0x...b5315',
    to: '0x...a6315',
  },
];

const Gamer = () => {
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
            Total Rewards Earned:{' '}
            <span className="account-summary__earned">1560 TILE</span>
          </h3>
          <h3>
            Rewards Exchanged for Rose:{' '}
            <span className="account-summary__exchanged">1500 TILE</span>
          </h3>
          <h3>
            Current Balance: <span className="account-summary__balance">60 TILE</span>
          </h3>
        </div>
      </Col>
      <Col span={16}>
        <div className="transactions">
          <h2 className="transactions__title">Transaction History</h2>
          <div className="table">
            <div className="table__title">
              <ul>
                <li>Transaction ID</li>
                <li>Type</li>
                <li>Date</li>
                <li>Amount(TILE)</li>
                <li>Game</li>
              </ul>
              <section className="transactions__rows">
                {transactions.map((transaction) => (
                  <article
                    className={`row ${
                      transaction.type === 'Reward' ? 'row--green' : 'row--red'
                    }`}
                    key={transaction.id}
                  >
                    <ul className="shown-content">
                      <li>{transaction.id}</li>
                      <li>{transaction.type}</li>
                      <li>{transaction.date}</li>
                      <li>{`${transaction.type === 'Withdrawal' ? '-' : ''} ${
                        transaction.amount
                      }`}</li>
                      <li>{transaction.game}</li>
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
