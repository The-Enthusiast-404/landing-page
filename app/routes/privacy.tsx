// app/routes/privacy.tsx

import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - Life in Weeks" },
    {
      name: "description",
      content: "Privacy policy for the Life in Weeks browser extension",
    },
  ];
};

export default function Privacy() {
  return (
    <div className="text-white container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Privacy Policy for Life in Weeks
      </h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
        <p>
          Life in Weeks is committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, and safeguard your information
          when you use our browser extension.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Information Collection and Use
        </h2>
        <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
        <p>
          The Life in Weeks extension collects and stores the following personal
          information:
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Your date of birth</li>
          <li>Your expected lifespan</li>
        </ul>
        <p>
          This information is used solely for the purpose of generating your
          personalized life visualization within the extension.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-4">
          Storage of Personal Data
        </h3>
        <p>
          All personal data is stored locally on your device using the browser's
          built-in storage mechanisms. We do not transmit, collect, or store any
          of your personal information on external servers.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-4">Usage Data</h3>
        <p>
          We do not collect any usage data, analytics, or tracking information
          about how you use the extension.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
        <p>
          We are committed to ensuring the security of your information. To
          prevent unauthorized access or disclosure, we have implemented
          suitable physical, electronic, and managerial procedures to safeguard
          and secure the information we collect and store locally on your
          device.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Third-Party Access</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties. Your data remains strictly on your local device.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">User Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 mb-3">
          <li>Access the personal information we have about you</li>
          <li>Correct any information you believe is inaccurate</li>
          <li>Request the deletion of your personal information at any time</li>
        </ul>
        <p>
          To exercise these rights, you can simply modify or delete your
          information directly within the extension settings, or uninstall the
          extension to remove all associated data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">
          Changes to Personal Information
        </h2>
        <p>
          You can change or delete your personal information at any time through
          the extension&quot;s interface. Alternatively, uninstalling the
          extension will remove all stored data from your device.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Policy Updates</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last Updated" date.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at [Your Contact Information].
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Consent</h2>
        <p>
          By using the Life in Weeks extension, you consent to this Privacy
          Policy.
        </p>
      </section>
    </div>
  );
}
