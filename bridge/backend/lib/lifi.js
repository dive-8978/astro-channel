// 模拟 LiFi SDK
module.exports = class LiFi {
  constructor(){}

  async getRoutes(){ return [{route:'simulated'}]; }
  async executeRoute(){ return true; }
}
