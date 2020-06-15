import { CoinSymbol } from '../../state/ducks/explorer/types';
import { transactionDetailByAddress } from './../transactionDetailByAddress';

it('should return detail url', () => {
  expect(
    transactionDetailByAddress(
      CoinSymbol.BTC,
      'mr6ioeUxNMoavbr2VjaSbPAovzzgDT7Su9'
    )
  ).toStrictEqual(
    'https://blockstream.info/testnet/address/mr6ioeUxNMoavbr2VjaSbPAovzzgDT7Su9'
  );
  expect(
    transactionDetailByAddress(
      CoinSymbol.BTC_B,
      'tbnb1z20t7rn6urh46m2tavny3ap9n0pvkf47mynuza'
    )
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/address/tbnb1z20t7rn6urh46m2tavny3ap9n0pvkf47mynuza'
  );
  expect(
    transactionDetailByAddress(
      CoinSymbol.BTC_B_888,
      'tbnb1z20t7rn6urh46m2tavny3ap9n0pvkf47mynuza'
    )
  ).toStrictEqual(
    'https://testnet-explorer.binance.org/address/tbnb1z20t7rn6urh46m2tavny3ap9n0pvkf47mynuza'
  );
});
