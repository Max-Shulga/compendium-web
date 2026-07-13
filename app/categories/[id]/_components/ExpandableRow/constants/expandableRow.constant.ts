import styles from '../ExpandableRow.module.css';
import type { TExpandableRowVariant } from '../models/expandable-row.model';

const VARIANT_CLASS_NAMES: Record<TExpandableRowVariant, string> = {
  topic: styles.itemTopic,
  category: styles.itemCategory
};

export { VARIANT_CLASS_NAMES };
