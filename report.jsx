var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var data = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

var reduce = function (row, memo) {
  if (row.type === 'impression') {
    memo.impressionCount = (memo.impressionCount || 0) + 1
  } else if (row.type === 'display') {
    memo.displayCount = (memo.displayCount || 0) + 1
  } else if (row.type === 'load') {
    memo.loadCount = (memo.loadCount || 0) + 1
  }

  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressionCount',
    sortBy: function(row) {
      return row.impressionCount || 0
    }
  },
  {
    title: 'Loads',
    value: 'loadCount',
    sortBy: function(row) {
      return row.loadCount || 0
    }
  },
  {
    title: 'Displays',
    value: 'displayCount',
    sortBy: function(row) {
      return row.displayCount || 0
    }
  },
  {
    title: 'Load Rate',
    value: function(row) {
      return (row.loadCount / row.impressionCount)
    },
    template: function(val, row) {
      return (val * 100).toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: function(row) {
      return (row.displayCount / row.loadCount)
    },
    template: function(val, row) {
      return (val * 100).toFixed(1) + '%'
    }
  }
]

module.exports = createReactClass({
  render () {
    return <ReactPivot rows={data}
                       dimensions={dimensions}
                       reduce={reduce}
                       calculations={calculations}
                       activeDimensions={['Date', 'Host']} />
  }
})
