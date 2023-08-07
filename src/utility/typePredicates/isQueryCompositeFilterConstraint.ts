import { QueryCompositeFilterConstraint, QueryConstraint } from "firebase/firestore";

export function isQueryCompositeFilterConstraint(
  constraint: QueryConstraint | QueryCompositeFilterConstraint
): constraint is QueryCompositeFilterConstraint {
  return constraint.type === 'and' || constraint.type === 'or';
}
