// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        interBlack: '#344054',
        interLightBlack:'#475467',
        mainBackground: '#F2F4F7',
        sideNavButtonBg: '#EAECF0',
        buttonColorGreen: '#027A48',
        buttonLightGreen:'#21BD7A',
        greenLightColor:"#12B76A",
        greyLightColor:'#D9D9D9',
        greyLightColorOpacity:'#f2f4f71a',
        greyWhiteColor:'#8C8C8C',
        greyLightDarkColor:'#7E7E7E',
        greyThinLightColor:'#BFBFBF',
        greyBlackLightColor:'#98A2B3',
        greyBlackColor:'#667085',
        blackLightColor:'#393939',
        blackDarkColor:"#1D2939",
        redErrorColor:'#FF3E1D',
        redButtonColor:'#F56A6A'
      },
      height: {
        46: '2.875rem',
        42:'42px',
        33:'33px',
        30:'30px'
      },
      width:{
        33:'33px',
        30:'30px'
      },
      fontSize: {
        small:'10px',
        logo: '22px',
      },
      boxShadow: {
        pageShadow: '0px 4px 24px rgba(0, 0, 0, 0.08);',
        card:'0px 4px 30px rgba(0, 0, 0, 0.1)'
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
};
