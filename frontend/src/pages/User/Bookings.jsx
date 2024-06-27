import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Barber from "../Barber/Barber";

const Bookings = (user) => {
  const { data: appointments } = useFetchData(`${BASE_URL}/users/`);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols2 gap5">
        {appointments.map((barber) => (
          <Barber barber={barber} key={barber._id} />
        ))}
      </div>
      {appointments.length === 0 && (
        <h2 className="mt-5 text-center leading7 text-[20px] font-semibold text-primaryColor">
          You did not book any barber yet!
        </h2>
      )}
    </div>
  );
};

export default Bookings;
