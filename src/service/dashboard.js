import request from './request'
const auth = {
  app_id: process.env.VUE_APP_DASHBOARD_APP_ID,
  app_secret: process.env.VUE_APP_DASHBOARD_APP_SECRET
}
// =====================================
export function getOverviewInfo(location, year) {
  return request.post('/gateway/default_list', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}

export function getNumberOfRegisteredFamilies(location, year) {
  return request.post('/gateway/all_total_family', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
export function getNumberOfRegisteredUsers(location, year) {
  return request.post('/gateway/all_total_user', {
    city_id: location.length > 1 ? location[0] : undefined,
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
export function getAppCoverage(location, year) {
  return request.post('/gateway/all_overview_village_cover', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
export function getNumberOfVillages(location, year) {
  return request.post('/gateway/all_village_num', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
export function getBonuses(location, year) {
  return request.post('/gateway/all_dividend_total_year', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
export function getLoanAmount(location, year) {
  return request.post('/gateway/all_creditamounts_loanvalue_total', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year
  }, { params: auth })
}
// =====================================
export function getPointData(location) {
  return Promise.all([
    request.post('/gateway/all_total_integral', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_governpoints_judge_count', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_governpoints_upjudge_count', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_governpoints_downjudge_count', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth })
  ])
}
export function getPointChartData(location) {
  return request.post('/gateway/all_governpoints_street_judgecount', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2]
  }, { params: auth })
}
export function getPointBoardData(location) {
  return Promise.all([
    request.post('/gateway/all_governpoints_upjudge_topten', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_governpoints_downjudge_topten', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth })
  ])
}
// =====================================

export function getPointRewardData(location) {
  return Promise.all([
    request.post('/gateway/all_wealexchange_exchangepreference_total', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_wealexchange_exchangecount', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_wealexchange_exchangerate', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth })
  ])
}

export function getArticleStats(location) {
  return request.post('/gateway/all_governtransparence_chart', {
    town_id: location[1],
    village_id: location[2]
  }, { params: auth })
}

// =====================================
export function getMostViewedArticles(location) {
  return request.post('/gateway/all_governtransparence_views_topten', {
    town_id: location[1],
    village_id: location[2]
  }, { params: auth })
}
// =====================================
export function getActiveUserDataByMonth(location, year, month) {
  return request.post('/gateway/all_governtransparence_years_user_active', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    year,
    month
  }, { params: auth })
}
export function getActiveUserData(location, start, end) {
  return request.post('/gateway/all_governtransparence_years_user_active', {
    // city_id: location[0],
    town_id: location[1],
    village_id: location[2],
    start,
    end
  }, { params: auth })
}
// =====================================
export function getBonusBoardData(location, year) {
  return request.post('/gateway/all_scorebonus_totalbonus_town_family_topten', {
    town_id: location[2] ? undefined : location[1],
    village_id: location[2],
    year
  }, { params: auth })
}

export function getBonusData(location, year) {
  return Promise.all([
    request.post('/gateway/all_dividend_familys_town', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2],
      year
    }, { params: auth }),
    request.post('/gateway/all_dividend_total_year', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2],
      year
    }, { params: auth }),
    request.post('/gateway/all_dividend_jifen_totals_town', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2],
      year
    }, { params: auth }),
    request.post('/gateway/all_dividend_total_shares', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2],
      year
    }, { params: auth })
  ])
}
// =====================================

export function getLoanChartData(location, year) {
  return request.post('/gateway/all_creditamounts_loanvalue_usercount_level', {
    year,
    city_id: location[0],
    town_id: location[1],
    village_id: location[2]
  }, { params: auth })
}

export function getCreditChartData(location) {
  return request.post('/gateway/all_creditamounts_loanvalue_usercount_level', {
    city_id: location[0],
    town_id: location[1],
    village_id: location[2]
  }, { params: auth })
}

export function getCreditData(location) {
  return Promise.all([
    request.post('/gateway/all_creditamounts_loanvalue_total', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_creditamounts_usercount_iscreditcondition', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth }),
    request.post('/gateway/all_creditamounts_allowedrate_iscreditcondition', {
      city_id: location[0],
      town_id: location[1],
      village_id: location[2]
    }, { params: auth })
  ])
}

// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
// =====================================
