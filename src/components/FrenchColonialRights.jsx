import React, { useState, useEffect } from 'react';
import { Crosshair, Trophy, Plus, Minus, RotateCcw, Save, TrendingUp, Award, Target } from 'lucide-react';

interface TeamKills {
  teamId: number;
  teamName: string;
  kills: number;
  deaths: number;
  assists: number;
}

const KillTracker: React.FC = () => {
  const [teams, setTeams] = useState<TeamKills[]>([]);
  const [numTeams, setNumTeams] = useState<number>(11);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadKillData();
  }, []);

  useEffect(() => {
    if (!loading && isInitialized) {
      autoSaveKillData();
    }
  }, [teams, isInitialized, loading]);

  const loadKillData = () => {
    try {
      setLoading(true);
      const savedData = localStorage.getItem('kill-tracker-data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setTeams(data.teams || []);
        setNumTeams(data.numTeams || 11);
        setIsInitialized(data.isInitialized || false);
      }
    } catch (error) {
      console.log('No saved kill data found:', error);
    } finally {
      setLoading(false);
    }
  };

  const autoSaveKillData = () => {
    try {
      const data = {
        teams,
        numTeams,
        isInitialized,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('kill-tracker-data', JSON.stringify(data));
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };

  const saveKillData = () => {
    try {
      const data = {
        teams,
        numTeams,
        isInitialized,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('kill-tracker-data', JSON.stringify(data));
      alert('✅ Амжилттай хадгаллаа!');
    } catch (error) {
      console.error('Storage error:', error);
      alert('❌ Хадгалахад алдаа гарлаа: ' + error.message);
    }
  };

  const initializeTeams = () => {
    const newTeams: TeamKills[] = [];
    for (let i = 1; i <= numTeams; i++) {
      newTeams.push({
        teamId: i,
        teamName: `Баг ${i}`,
        kills: 0,
        deaths: 0,
        assists: 0
      });
    }
    setTeams(newTeams);
    setIsInitialized(true);
  };

  const updateTeamName = (teamId: number, newName: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId ? { ...team, teamName: newName } : team
      )
    );
  };

  const updateKills = (teamId: number, change: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, kills: Math.max(0, team.kills + change) }
          : team
      )
    );
  };

  const setKills = (teamId: number, value: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, kills: Math.max(0, value) }
          : team
      )
    );
  };

  const updateDeaths = (teamId: number, change: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, deaths: Math.max(0, team.deaths + change) }
          : team
      )
    );
  };

  const setDeaths = (teamId: number, value: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, deaths: Math.max(0, value) }
          : team
      )
    );
  };

  const updateAssists = (teamId: number, change: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, assists: Math.max(0, team.assists + change) }
          : team
      )
    );
  };

  const setAssists = (teamId: number, value: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === teamId
          ? { ...team, assists: Math.max(0, value) }
          : team
      )
    );
  };

  const calculateKD = (kills: number, deaths: number): string => {
    if (deaths === 0) return kills.toFixed(2);
    return (kills / deaths).toFixed(2);
  };

  const resetAllData = () => {
    if (window.confirm('Бүх өгөгдлийг устгахдаа итгэлтэй байна уу?')) {
      setTeams([]);
      setIsInitialized(false);
      localStorage.removeItem('kill-tracker-data');
    }
  };

  const getSortedTeams = () => {
    return [...teams].sort((a, b) => {
      if (b.kills !== a.kills) return b.kills - a.kills;
      const kdA = a.deaths === 0 ? a.kills : a.kills / a.deaths;
      const kdB = b.deaths === 0 ? b.kills : b.kills / b.deaths;
      return kdB - kdA;
    });
  };

  const getTotalStats = () => {
    const totalKills = teams.reduce((sum, team) => sum + team.kills, 0);
    const totalDeaths = teams.reduce((sum, team) => sum + team.deaths, 0);
    const totalAssists = teams.reduce((sum, team) => sum + team.assists, 0);
    return { totalKills, totalDeaths, totalAssists };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Ачааллаж байна...</div>
      </div>
    );
  }

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
                <Crosshair className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Kill Tracker System
                </h1>
                <p className="text-gray-600 text-sm">Багуудын Kill/Death/Assist тоолуур</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={saveKillData}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Хадгалах
              </button>
              <button
                onClick={resetAllData}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Дахин эхлэх
              </button>
            </div>
          </div>

          {!isInitialized ? (
            <div className="space-y-4">
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                  Багийн тоо
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNumTeams(Math.max(2, numTeams - 1))}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={numTeams}
                    onChange={(e) => setNumTeams(Math.max(2, parseInt(e.target.value) || 2))}
                    min="2"
                    max="50"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-center font-bold text-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    onClick={() => setNumTeams(numTeams + 1)}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={initializeTeams}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                🎯 Эхлүүлэх ({numTeams} баг)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl text-white">
                <Target className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{stats.totalKills}</div>
                <div className="text-sm opacity-90">Нийт Kills</div>
              </div>
              <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-4 rounded-xl text-white">
                <Crosshair className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{stats.totalDeaths}</div>
                <div className="text-sm opacity-90">Нийт Deaths</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                <TrendingUp className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{stats.totalAssists}</div>
                <div className="text-sm opacity-90">Нийт Assists</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                <Trophy className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">{teams.length}</div>
                <div className="text-sm opacity-90">Багууд</div>
              </div>
            </div>
          )}
        </div>

        {isInitialized && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  🏆 Багуудын эрэмбэ
                </h2>
                <div className="space-y-3">
                  {getSortedTeams().map((team, index) => (
                    <div
                      key={team.teamId}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400'
                          : 'bg-gray-50 border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-400">
                            {index === 0 && '👑'} #{index + 1}
                          </span>
                          <span className="font-bold text-gray-800">{team.teamName}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{team.kills}</div>
                          <div className="text-xs text-gray-500">Kills</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                          <div className="font-bold text-gray-700">{team.deaths}</div>
                          <div className="text-xs text-gray-500">Deaths</div>
                        </div>
                        <div>
                          <div className="font-bold text-blue-600">{team.assists}</div>
                          <div className="text-xs text-gray-500">Assists</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">{calculateKD(team.kills, team.deaths)}</div>
                          <div className="text-xs text-gray-500">K/D</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Controls */}
            <div className="lg:col-span-2 space-y-4">
              {teams.map((team) => (
                <div key={team.teamId} className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6">
                  <div className="mb-4">
                    <input
                      type="text"
                      value={team.teamName}
                      onChange={(e) => updateTeamName(team.teamId, e.target.value)}
                      className="w-full px-4 py-2 text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Багийн нэр"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Kills */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border-2 border-red-200">
                      <div className="text-center mb-3">
                        <div className="text-sm font-semibold text-red-600 mb-2">KILLS</div>
                        <input
                          type="number"
                          value={team.kills}
                          onChange={(e) => setKills(team.teamId, parseInt(e.target.value) || 0)}
                          className="w-full text-4xl font-bold text-red-600 text-center bg-transparent border-2 border-red-300 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateKills(team.teamId, -1)}
                          className="flex-1 bg-red-200 hover:bg-red-300 text-red-700 font-bold py-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateKills(team.teamId, 1)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>

                    {/* Deaths */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-300">
                      <div className="text-center mb-3">
                        <div className="text-sm font-semibold text-gray-600 mb-2">DEATHS</div>
                        <input
                          type="number"
                          value={team.deaths}
                          onChange={(e) => setDeaths(team.teamId, parseInt(e.target.value) || 0)}
                          className="w-full text-4xl font-bold text-gray-700 text-center bg-transparent border-2 border-gray-400 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateDeaths(team.teamId, -1)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateDeaths(team.teamId, 1)}
                          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>

                    {/* Assists */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                      <div className="text-center mb-3">
                        <div className="text-sm font-semibold text-blue-600 mb-2">ASSISTS</div>
                        <input
                          type="number"
                          value={team.assists}
                          onChange={(e) => setAssists(team.teamId, parseInt(e.target.value) || 0)}
                          className="w-full text-4xl font-bold text-blue-600 text-center bg-transparent border-2 border-blue-300 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateAssists(team.teamId, -1)}
                          className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-700 font-bold py-2 rounded-lg transition-colors"
                        >
                          <Minus className="w-5 h-5 mx-auto" />
                        </button>
                        <button
                          onClick={() => updateAssists(team.teamId, 1)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* K/D Ratio Display */}
                  <div className="mt-4 text-center">
                    <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full">
                      <span className="text-sm font-semibold">K/D Ratio: </span>
                      <span className="text-lg font-bold">{calculateKD(team.kills, team.deaths)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KillTracker;
