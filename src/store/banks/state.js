export default function () {
  return {
    banks: [
      {
          name: 'Bancaribe',
          img: require('assets/bankImage/bancaribe.jpg'),
          id: 0,
          format: 'mipago V_CI _BANKCODE _MONTO _TELF'
      },
      {
          name: 'Banesco',
          img: require('assets/bankImage/banesco.png'),
          id: 1,
          format: 'mipago V_CI _BANKCODE _MONTO _TELF'
      },
      {
          name: 'Venezuela',
          img: require('assets/bankImage/BDV.png'),
          id: 2,
          format: 'mipago V_CI _BANKCODE _MONTO _TELF'
      },
      {
          name: 'B.O.D',
          img: require('assets/bankImage/bod.png'),
          id: 3,
          format: 'mipago V_CI _BANKCODE _MONTO _TELF'
      }
    ]
  }
}
