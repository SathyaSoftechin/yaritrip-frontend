import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-6 md:px-16 py-10 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10">
          REFUND AND CANCELLATION POLICY
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Effective Date: April 28, 2026
        </p>

        <p className="mb-6 leading-relaxed">
          This Refund and Cancellation Policy ('Policy') sets out the terms
          governing cancellations, refunds, and modifications to bookings made
          through the Yaaritrip Platform. This Policy is to be read in
          conjunction with our Terms and Conditions and applies to all travel
          services booked through www.yaaritrip.com. Yaaritrip acts as an
          intermediary between Users and third-party Service Providers.
          Accordingly, cancellation and refund terms are primarily governed by
          the policies of the respective Service Provider (airline, hotel, bus
          operator, tour operator, etc.), subject to any additional terms set
          out in this Policy.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. GENERAL PRINCIPLES</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cancellation requests must be submitted through the Platform via
              your booking management section or by contacting our customer
              support.
            </li>
            <li>
              Refunds, where applicable, will be processed to the original mode
              of payment used at the time of booking.
            </li>
            <li>
              Yaaritrip's convenience fee, service fee, or platform charges are
              non-refundable unless the cancellation is due to a Yaaritrip error
              or a system failure attributable to us.
            </li>
            <li>
              Refund timelines are subject to processing times of the respective
              payment gateway, bank, or financial institution and may take
              between five (5) to fifteen (15) business days after the refund is
              initiated by Yaaritrip.
            </li>
            <li>
              Yaaritrip reserves the right to deduct applicable cancellation
              charges as notified at the time of booking before processing a
              refund.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. FLIGHT BOOKINGS</h2>
          <h3 className="text-xl font-semibold mb-3">2.1 Cancellation</h3>
          <p>
            Cancellation of flight tickets is subject to the fare rules of the
            airline under which the ticket was issued. The cancellation charges,
            if any, levied by the airline will be deducted from the refund
            amount. Some fare classes are entirely non-refundable and
            non-changeable.
          </p>
          <p>Requests for cancellation must be made at least:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Forty-eight (48) hours before departure for international flights
            </li>
            <li>
              Twenty-four (24) hours before departure for domestic flights
            </li>
          </ul>
          <p>
            Requests made after these cut-offs may not be eligible for any
            refund, subject to the airline's applicable fare rules.
          </p>

          <h3 className="text-xl font-semibold mb-3">2.2 No-Show</h3>
          <p>
            If a passenger fails to report for departure without cancelling in
            advance, the ticket shall be treated as a 'no-show'. No-show tickets
            are generally non-refundable. A no-show fee may be levied by the
            airline in addition to the fare forfeiture.
          </p>
          <h3 className="text-xl font-semibold mb-3">
            2.3 Airline-Initiated Changes or Cancellations
          </h3>
          <p>
            If an airline cancels or significantly reschedules a flight, you are
            entitled to a full refund of the base fare in accordance with
            applicable aviation regulations and the DGCA's Passenger Charter.
            Yaaritrip will facilitate the refund claim upon verification.
            Refunds from airlines may take additional time depending on the
            airline's processing schedule.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. HOTEL BOOKINGS</h2>
          <h3 className="leading-relaxed font-semibold">3.1 Cancellation</h3>
          <p>
            <ul>
              Hotel cancellation policies vary by property and rate type. The
              applicable policy will be displayed at the time of booking. Common
              categories include:
              <li>
                Free Cancellation: Cancellations made before the specified
                deadline attract no charge and entitle you to a full refund of
                the hotel component
              </li>
              <li>
                Partially Refundable: Cancellations made after a specified date
                attract a partial charge equivalent to one or more nights' stay
              </li>
              <li>
                Non-Refundable: Certain promotional or advance purchase rates
                are non-refundable under any circumstances
              </li>
            </ul>
          </p>
          <h3 className="leading-relaxed font-semibold">3.2 Early Check-Out</h3>
          <p>
            <ul>
              Early check-out is subject to the hotel's policy and may not
              entitle you to a refund for unused nights. You should confirm this
              with the property directly.
            </ul>
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            4. BUS AND RAIL BOOKINGS
          </h2>
          <p className="leading-relaxed">
            Cancellations for bus and rail tickets are governed by the
            respective operator's or service provider's refund rules. Yaaritrip
            will apply such rules as communicated by the operator. For rail
            bookings made through the IRCTC gateway, IRCTC's cancellation and
            refund policy shall apply in full.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            5. HOLIDAY PACKAGES AND TOURS
          </h2>
          <p className="leading-relaxed">
            Cancellation of holiday packages and tour bookings is subject to the
            following general schedule, unless a specific policy is communicated
            at the time of booking:
          </p>
          <ul>
            <li>
              • Cancellation more than 30 days before departure: Up to 25% of
              the package cost may be forfeited as cancellation charges <br />•
              Cancellation between 15 and 30 days before departure: Up to 50% of
              the package cost may be forfeited
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            6. MODIFICATIONS AND DATE CHANGES
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            Requests for date changes, name changes, or itinerary modifications
            are subject to the policies of the respective Service Provider and
            may attract applicable change fees. Yaaritrip may charge an
            additional amendment processing fee for facilitating such changes.
            Modifications are subject to availability at the time of the change
            request.
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. REFUND PROCESS</h2>
          <p className="leading-relaxed">
            Once a cancellation request is accepted and processed:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds to credit or debit cards: 5 to 10 business days</li>
            <li>Refunds to net banking accounts: 3 to 7 business days</li>
            <li>Refunds to UPI-linked accounts: 1 to 3 business days</li>
            <li>
              Refunds to Yaritrip wallet (where applicable): Within 24 hours
            </li>
          </ul>
          <p className="pt-3">
            If a refund has not been received within the stated timeline, please
            contact your bank or payment provider first. If the issue persists,
            contact our customer support with your booking reference number.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. FORCE MAJEURE</h2>
          <p className="leading-relaxed">
            In the event of circumstances beyond reasonable control, including
            but not limited to natural disasters, pandemics, government-imposed
            travel restrictions, acts of war or terrorism, or civil unrest,
            Yaaritrip shall not be held liable for any cancellations or
            non-performance of services by Service Providers. Refund
            entitlements in such cases will be governed by the Service
            Provider's applicable policy and applicable law, including any
            directions issued by DGCA or other regulatory authorities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            9. DISPUTES AND GRIEVANCES
          </h2>
          <p className="leading-relaxed">
            If you are dissatisfied with a refund decision, you may raise a
            grievance with our Grievance Officer at grievance@yaaritrip.com. All
            grievances will be acknowledged within 48 hours and resolved within
            30 days. You also retain the right to approach the Consumer Disputes
            Redressal Forum under the Consumer Protection Act, 2019.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">10. CONTACT</h2>
          <p className="leading-relaxed">
            For all cancellation and refund queries, <br />
            please contact: <br />
            Email: info.yaritrip@gmail.com <br />
            Address: S Chandra Reddy Towers, 100 Feet Rd, VIP Hills, Jaihind
            Enclave, Madhapur, Hyderabad, Telangana 500081, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
