import { v4 as uuid } from "uuid";
import {
  autorun,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
} from "mobx";
import { Type } from "@thi.ng/shader-ast";
import { defaults } from "lodash";
import { Output } from "../Output/Output";
import { Artboard } from "../Context/Context";
import { Input } from "../Input/Input";
import { IConnectionProps, IConnectionSerialized } from "./Connection.types";
import { Node } from "../Node/Node";
import {
  ComputedInputValue,
  InputValue,
  SerializableInputValue,
} from "../Input/Input.types";

export class Connection<TType extends Type> {
  /** Unique Identifier */
  public id: string;
  /** Associated Artboard */
  public artboard: Artboard;
  /** From Output */
  public from: Output<TType, Node>;
  /** To Input */
  public to: Input<TType, Node>;
  /** Previous Input Value */
  public previousInputValue: InputValue<TType>;

  /** Reaction Disposer */
  private reactionDisposer: IReactionDisposer;

  constructor(artboard: Artboard, props: IConnectionProps<TType>) {
    const { id } = defaults(props, {
      id: uuid(),
    });

    this.id = id;
    this.artboard = artboard;
    this.from = props.from;
    this.to = props.to;
    this.previousInputValue = props.to.value;

    makeObservable(this, {
      id: observable,
      from: observable,
      to: observable,
      type: computed,
    });

    this.reactionDisposer = autorun(() => {
      if (this.to.validator(this.from.value)) {
        this.to.value = this.from;
      } else {
        throw new Error(
          `Validation of value from Output ${this.from.id} to Input ${this.to.id} failed`
        );
      }
    });
  }

  /** Connection Value Type */
  get type(): TType {
    return this.from.type;
  }

  /** Disposes Connection */
  public dispose(): void {
    this.reactionDisposer();

    this.to.value = this.previousInputValue;
  }

  /** Serializes Connection */
  public toJSON(): IConnectionSerialized<TType> {
    return {
      id: this.id,
      from: this.from.id,
      to: this.to.id,
    };
  }
}
