module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px2rem-exclude': {
      remUnit: 456,
      // exclude: /src[\/\\]views[\/\\]cockpit[\/\\](xcsz|waste-management|subsidies)\.vue|src[\/\\]views[\/\\]newCockpit|src[\/\\]components[\/\\](Dashboard|WasteManagement|Subsidies)|src[\/\\]views[\/\\]iframe[\/\\](phMap)\.vue|node_modules/
      // exclude: /src[\/\\]views[\/\\]cockpit|src[\/\\]views[\/\\]dataAssets|src[\/\\]views[\/\\]liveable[\/\\](index|center|left|right)\.vue|src[\/\\]views[\/\\]liveable[\/\\](components)|src[\/\\]views[\/\\](newCockpit|phdm)|src[\/\\]components[\/\\](Dashboard|WasteManagement|Subsidies)|src[\/\\]views[\/\\]iframe[\/\\](phMap)\.vue|node_modules/
      exclude: /src[\/\\]views[\/\\]cockpit|src[\/\\]views[\/\\]liveable[\/\\](index|center|left|right)\.vue|src[\/\\]views[\/\\]liveable[\/\\](components)|src[\/\\]views[\/\\](phdm-demo)|src[\/\\]views[\/\\]fenghua[\/\\]rice[\/\\](index|center|left|right)\.vue|src[\/\\]views[\/\\]fenghua[\/\\]rice[\/\\](components)|src[\/\\]views[\/\\]newCockpit|src[\/\\]views[\/\\]phOnlineTradingAgricultural|src[\/\\]components[\/\\](Dashboard|WasteManagement|Subsidies)|src[\/\\]views[\/\\]iframe[\/\\](phMap)\.vue|node_modules|src[\/\\]views[\/\\]dataAssets/
    }
  }
}
