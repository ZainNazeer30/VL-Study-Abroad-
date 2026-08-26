// Article bodies, imported statically here and ONLY here.
//
// Nothing but src/pages/BlogPost.jsx imports this file, so the bundler puts all of the article
// text into the chunk that loads when a reader opens an article. The home page and the guides
// index import src/data/blog.js instead, which now holds only titles, excerpts and dates.

import p_apply_to_italy_and_france_from_pakistan from './posts/apply-to-italy-and-france-from-pakistan'
import p_choosing_a_university_in_italy_or_france from './posts/choosing-a-university-in-italy-or-france'
import p_cost_of_studying_in_italy_and_france from './posts/cost-of-studying-in-italy-and-france'
import p_france_student_visa_from_pakistan from './posts/france-student-visa-from-pakistan'
import p_fully_funded_scholarships_for_pakistani_students from './posts/fully-funded-scholarships-for-pakistani-students'
import p_hec_ibcc_mofa_attestation_order from './posts/hec-ibcc-mofa-attestation-order'
import p_intake_deadlines_italy_france from './posts/intake-deadlines-italy-france'
import p_italy_student_visa_from_pakistan from './posts/italy-student-visa-from-pakistan'
import p_study_without_ielts from './posts/study-without-ielts'

export const BODY_BY_SLUG = {
  'apply-to-italy-and-france-from-pakistan': p_apply_to_italy_and_france_from_pakistan,
  'choosing-a-university-in-italy-or-france': p_choosing_a_university_in_italy_or_france,
  'cost-of-studying-in-italy-and-france': p_cost_of_studying_in_italy_and_france,
  'france-student-visa-from-pakistan': p_france_student_visa_from_pakistan,
  'fully-funded-scholarships-for-pakistani-students': p_fully_funded_scholarships_for_pakistani_students,
  'hec-ibcc-mofa-attestation-order': p_hec_ibcc_mofa_attestation_order,
  'intake-deadlines-italy-france': p_intake_deadlines_italy_france,
  'italy-student-visa-from-pakistan': p_italy_student_visa_from_pakistan,
  'study-without-ielts': p_study_without_ielts,
}
