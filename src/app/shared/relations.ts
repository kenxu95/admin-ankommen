
export const user = {
  hasMany: {
    image: {
      foreignKey: 'user_ids',
      localField: 'images'
    },
    userAsset: {
      foreignKey: 'user_ids',
      localField: 'userAssets'
    },
    task: {
      localKey: 'task_ids',
      localField: 'tasks'
    }
  }
}

export const task = {
  hasMany: {
    location: {
      foreignKey: 'task_ids',
      localField: 'locations'
    },
    timeRange: {
      foreignKey: 'task_ids',
      localField: 'timeRanges'
    },
    user: {
      localKey: 'user_ids',
      localField: 'users'
    },
    asset: {
      localKey: 'asset_ids',
      localField: 'assets'
    }
  }
}

export const asset = {
  hasMany: {
    userAsset: {
      foreignKey: 'asset_ids',
      localField: 'userAssets'
    },
    image: {
      foreignKey: 'asset_ids',
      localField: 'images'
    },
    task: {
      localKey: 'task_ids',
      localField: 'tasks'
    }
  }
}

export const image = {
  belongsTo: {
    user: {
      foreignKey: 'user_id',
      localField: 'user'
    },
    asset: {
      foreignKey: 'asset_id',
      localField: 'asset'
    }
  }
}

export const location = {
  belongsTo: {
    task: {
      foreignKey: 'task_id',
      localField: 'task'
    },
    userAsset: {
      foreignKey: 'userAsset_id',
      localField: 'userAsset'
    }
  }
}

export const userAsset = {
  belongsTo: {
    user: {
      foreignKey: 'user_id',
      localField: 'user'
    },
    asset: {
      foreignKey: 'asset_id',
      localField: 'asset'
    }
  },

  hasMany: {
    timeRange: {
      foreignKey: 'userAsset_ids',
      localField: 'timeRanges'
    },
    location: {
      foreignKey: 'userAsset_ids',
      localField: 'locations'
    }
  }
}

export const timeRange = {
  belongsTo: {
    userAsset: {
      foreignKey: 'userAsset_id',
      localField: 'userAsset'
    },
    task: {
      foreignKey: 'task_id',
      localField: 'task'
    }
  }
}































