import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, 
  FaClock, FaUserFriends, FaCheckCircle, FaTimesCircle 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeTab, setActiveTab] = useState('metrics');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reservationsRes, metricsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/reservations'),
        axios.get('http://localhost:5000/api/reservations/metrics')
      ]);
      setReservations(Array.isArray(reservationsRes.data.reservations) ? reservationsRes.data.reservations : []);
      setMetrics(metricsRes.data.metrics || {});
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta reserva permanentemente?')) {
      try {
        await axios.delete(`http://localhost:5000/api/reservations/${id}`);
        fetchData();
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/reservations/${id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      alert('Error al actualizar');
    }
  };

  const filteredReservations = reservations
    .filter(reservation => {
      const matchesSearch = reservation.name.toLowerCase().includes(search.toLowerCase()) ||
                           reservation.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      const matchesBranch = branchFilter === 'all' || reservation.branch === branchFilter;
      return matchesSearch && matchesStatus && matchesBranch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const pieData = [
    { name: 'Pendientes', value: metrics.pending || 0, color: '#f59e0b' },
    { name: 'Confirmadas', value: metrics.confirmed || 0, color: '#10b981' },
    { name: 'Canceladas', value: metrics.cancelled || 0, color: '#ef4444' }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Cargando dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container py-12 pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-slate-800 bg-clip-text text-transparent mb-3 leading-tight">
              Dashboard
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-md">
              Gestión completa de reservas - {metrics.total || 0} total
            </p>
          </div>
          <button 
            onClick={fetchData}
            className="btn-primary max-w-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <span>🔄</span>
            <span>Actualizar Datos</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-6 py-3 font-bold text-lg transition-all ${
              activeTab === 'metrics'
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📊 Métricas
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-3 font-bold text-lg transition-all ${
              activeTab === 'reservations'
                ? 'text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📋 Gestión de Reservas
          </button>
        </div>
      </div>

      <div className="container pb-12">
        {/* METRICS TAB */}
        {activeTab === 'metrics' && (
          <>
            {/* Métricas Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="card p-8 text-center group hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">
                  <FaUserFriends className="text-primary mx-auto" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">
                  {metrics.total || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Total Reservas
                </div>
              </div>

              <div className="card p-8 text-center group hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">
                  <FaClock className="text-yellow-500 mx-auto" />
                </div>
                <div className="text-3xl font-black text-yellow-600 mb-1">
                  {metrics.pending || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Pendientes
                </div>
              </div>

              <div className="card p-8 text-center group hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">
                  <FaCheckCircle className="text-emerald-500 mx-auto" />
                </div>
                <div className="text-3xl font-black text-emerald-600 mb-1">
                  {metrics.confirmed || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Confirmadas
                </div>
              </div>

              <div className="card p-8 text-center group hover:scale-[1.02] transition-all duration-300">
                <div className="text-4xl mb-4">
                  <FaTimesCircle className="text-red-500 mx-auto" />
                </div>
                <div className="text-3xl font-black text-red-600 mb-1">
                  {metrics.cancelled || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Canceladas
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  📊 Distribución de Reservas
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                  📈 Reservas por Estado
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={pieData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 600 }} />
                    <YAxis axisLine={false} tickLine={false} tickMargin={20} />
                    <Tooltip />
                    <Bar dataKey="value" fill="url(#gradient)" radius={[4, 4, 0, 0]}>
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* RESERVATIONS TAB */}
        {activeTab === 'reservations' && (
          <>
            {/* Controls */}
            <div className="card p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  📋 Gestión de Reservas
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {filteredReservations.length} de {reservations.length}
                  </span>
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {/* Search */}
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl w-full sm:w-80">
                    <FaSearch className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Buscar por nombre o email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-transparent outline-none w-full text-sm"
                    />
                  </div>
                  
                  {/* Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="confirmed">Confirmadas</option>
                    <option value="cancelled">Canceladas</option>
                  </select>

                  {/* Branch Filter */}
                  <select
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    <option value="all">Todas las sucursales</option>
                    <option value="centro">Centro</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Sucursal</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Personas</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-32">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6 font-semibold text-gray-900">
                      {reservation.name}
                    </td>
                    <td className="px-8 py-6 text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {reservation.branch === 'centro' ? 'Centro' : 
                         reservation.branch === 'norte' ? 'Norte' : 
                         reservation.branch === 'sur' ? 'Sur' : reservation.branch}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-700">
                      <div>
                        <div className="font-medium">
                          {new Date(reservation.date).toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-sm text-gray-500">{reservation.time}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {reservation.guests} personas
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <select
                        value={reservation.status}
                        onChange={(e) => updateStatus(reservation._id, e.target.value)}
                        className={`status-badge px-4 py-2 font-semibold border-2 ${statusColors[reservation.status]}`}
                      >
                        <option value="pending">⏳ Pendiente</option>
                        <option value="confirmed">✅ Confirmada</option>
                        <option value="cancelled">❌ Cancelada</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-gray-700 truncate max-w-xs" title={reservation.email}>
                        {reservation.email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button 
                          onClick={() => {
                            setEditingId(reservation._id);
                            setEditForm(reservation);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl hover:scale-110 transition"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(reservation._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-xl hover:scale-110 transition"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            {filteredReservations.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-6 opacity-25">📭</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No hay reservas</h3>
                <p className="text-gray-500 mb-6">
                  {search || statusFilter !== 'all' || branchFilter !== 'all'
                    ? 'No se encontraron reservas con estos filtros' 
                    : '¡Aún no hay reservas!'}
                </p>
                <button onClick={fetchData} className="btn-primary max-w-sm mx-auto">
                  Recargar datos
                </button>
              </div>
            )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;