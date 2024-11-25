import supabase from '../config/db.js';

const Venta = {
  async registrarVenta({ usuario_id, total }) {
    const { data, error } = await supabase
      .from('ventas')
      .insert([{ usuario_id, total }]);

    if (error) throw new Error(error.message);
    return data;
  },
};

export default Venta;