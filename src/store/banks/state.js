export default function () {
  return {
    banks: [
      {
          name: 'Bancaribe',
          img: require('assets/bankImage/bancaribe.jpg'),
          id: 0,
          format: 'mipago V_CI _BANKCODE _MONTO,00 _TELF'
      },
      {
          name: 'Banesco',
          img: require('assets/bankImage/banesco.png'),
          id: 1,
          format: '_BANKCODE _TELF V _CI _MONTO,00'
      },
      {
          name: 'Venezuela',
          img: require('assets/bankImage/BDV.png'),
          id: 2,
          format: 'PAGAR _BANKCODE _TELF _CI _MONTO,00'
      },
      {
          name: 'B.O.D',
          img: require('assets/bankImage/bod.png'),
          id: 3,
          format: 'PAGO (C.I EMISOR) _BANKCODE _TELF _CI _MONTO'
      }
    ]
  }
}
