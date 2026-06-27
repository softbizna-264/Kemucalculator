/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calculator } from "./components/Calculator";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <Calculator />
    </div>
  );
}
